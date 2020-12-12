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
    //console.log(file);
    let filename = file.originalname;
    if (filename.length > 10) {
      filename = filename.substring(filename.length - 10, filename.length);
    }
    filename = file.fieldname + "_" + Date.now() + "_" + filename;

    callback(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 5000000 } }); //5Mb

uploadRouter.route("/").get((req, res) => {
  UpImage.find()
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

uploadRouter.route("/").post(upload.single("sliderbar"), (req, res, next) => {
  const uploadedFile = res.req.file.filename;

  // console.log("articleRouter.route->add");
  const newItem = new UpImage({
    filename: uploadedFile,
    uploader_id: getCallerIP(req),
    uploader_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
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
      const filepath = path.join(
        __dirname,
        "..",
        "/public/images/",
        item.filename
      );

      console.log("delete:", filepath);
      fs.unlinkSync(filepath);

      res.json({ msg: "deleted.", id: req.params.id });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = uploadRouter;
