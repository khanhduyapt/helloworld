const uploadRouter = require("express").Router();
const UpImage = require("../models/image.model");
const { getCallerIP, getUserName } = require("./utils");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    // console.log(file);
    let filename = file.originalname;
    if (filename.length > 10) {
      filename = filename.substring(filename.length - 10, filename.length);
    }
    filename = file.fieldname + "_" + Date.now() + "_" + filename;

    callback(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 5000000 } }); //5Mb

uploadRouter.route("/sliderbar").get((req, res) => {
  UpImage.find()
    .where("category")
    .equals("sliderbar")
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

uploadRouter
  .route("/sliderbar")
  .post(upload.single("img"), (req, res, next) => {
    console.log("/sliderbar", res.req.body);

    const _id = res.req.body._id;
    const _filename = res.req.body._filename;
    const _header = res.req.body._header;
    const _content = res.req.body._content;
    const _file = res.req.file;

    let newFilename = undefined;
    if (_file) {
      newFilename = res.req.file.filename;
    }
    //console.log("body:", _id, _filename, _header, _content, _file, newFilename);

    //I. Có Id: (1) không có ảnh -> update content; (2) có ảnh -> delete ảnh cũ, update content.
    if (_id !== "add") {
      if (newFilename) {
        UpImage.findById(_id).then((item) => {
          const oldFilepath = getImagesFolder(item.filename);
          //console.log("delete:", oldFilepath);
          fs.unlinkSync(oldFilepath);

          item.filename = newFilename;
          item.header = _header;
          item.content = _content;
          item.uploader_id = getCallerIP(req);
          item.uploader_account = getUserName(req);

          item
            .save()
            .then((newitem) => res.json(newitem))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      } else {
        UpImage.findById(_id).then((item) => {
          item.header = _header;
          item.content = _content;
          item
            .save()
            .then((newitem) => res.json(newitem))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      }
    }
    //II. không có id: (3) không ảnh: cancel, (4): có ảnh: tạo mới.
    else {
      if (newFilename) {
        const newItem = new UpImage({
          category: "sliderbar",
          filename: newFilename,
          header: req.body.header,
          content: req.body.content,
          uploader_id: getCallerIP(req),
          uploader_account: getUserName(req),
        });

        newItem
          .save()
          .then((item) => res.json(item))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.status(201).json({ msg: "Cần chọn ảnh để upload lên server." });
      }
    }
  });

uploadRouter.route("/:id").get((req, res) => {
  // console.log("articleRouter.route->findById:", req.params.id);

  UpImage.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

uploadRouter.route("/:id").delete((req, res) => {
  // console.log("articleRouter.route->delete:", req.params.id);

  UpImage.findByIdAndDelete(req.params.id)
    .then((item) => {
      const filepath = getImagesFolder(item.filename);

      console.log("delete:", filepath);
      fs.unlinkSync(filepath);

      res.json({ msg: "deleted.", id: req.params.id });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

function getImagesFolder(filename) {
  return path.join(__dirname, "..", "/public/images/", filename);
}

module.exports = uploadRouter;
