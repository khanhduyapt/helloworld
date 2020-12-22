const uploadRouter = require("express").Router();
const UpImage = require("../models/image.model");
const { getCallerIP, getUserName } = require("./utils");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { multer_upload } = require("./multer");

uploadRouter.route("/category/:cname").get((req, res) => {
  UpImage.find()
    .where("category")
    .equals(req.params.cname)
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

uploadRouter
  .route("/category/:cname")
  .post(multer_upload.single("img"), (req, res, next) => {
    //console.log("/:cname", res.req.body);

    const _id = res.req.body._id;
    const _category = res.req.body._category;
    const _header = res.req.body._header;
    const _content = res.req.body._content;
    const _file = res.req.file;

    let newFilename = undefined;
    if (_file) {
      newFilename = res.req.file.filename;
    }
    //console.log("body:", _id, _category, _header, _content, _file, newFilename);

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
          filename: newFilename,
          category: _category,
          header: _header,
          content: _content,
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

// ---------------------------------------------------------
//https://anonystick.com/blog-developer/nodejs-resize-image-trong-nodejs-su-dung-multer-va-sharp-bxIS8CfD
/* upload.any() sử dụng func này chúng ta có thể upload được nhiều file */
uploadRouter
  .route("/avatar")
  .post(multer_upload.any(), function (req, res, next) {
    //let query = req.body;
    if (!req.body && !req.files) {
      res.json({ success: false });
    } else {
      /* res.json({ success: true, files: req.files }); */
      /* req.files các file upload return về một array, qua đó chúng ta có thể dễ dàng xử lý  */
      /* chú ý: nhớ rename file lại không nữa sinh ra lỗi. ở đay mình rename theo kích thuước mình resize. */

      sharp(req.files[0].path)
        .resize(250, 250)
        .toFile(
          "./public/images/" +
            "avatar_250x250_UserName" +
            req.files[0].filename.substring(req.files[0].filename.indexOf("."))
        )
        .then((output) => {
          res.json({
            avatar:
              "avatar_250x250_UserName" +
              req.files[0].filename.substring(
                req.files[0].filename.indexOf(".")
              ),
          });
        });
    }
  });

//---------------------------------------------------------
function getImagesFolder(filename) {
  return path.join(__dirname, "..", "/public/images/", filename);
}

module.exports = uploadRouter;
