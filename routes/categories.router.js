const categoryRouter = require("express").Router();
let Category = require("../models/category.model");
let { getCallerIP, getUserName } = require("./utils");
const { multer_upload } = require("./multer");
const path = require("path");
const fs = require("fs");

categoryRouter.route("/").get((req, res) => {
  Category.find()
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter.route("/add").post(multer_upload.any(), (req, res, next) => {
  //console.log("categoryRouter->add", req.body);

  const newItem = new Category({
    title: req.body.title,
    slogan: req.body.slogan,
    action_title1: req.body.action_title1,
    action_body1: req.body.action_body1,
    action_title2: req.body.action_title2,
    action_body2: req.body.action_body2,
    action_title3: req.body.action_title3,
    action_body3: req.body.action_body3,

    last_modify_ip: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  const _file = req.files[0];
  if (_file) {
    req.files.forEach((file) => {
      if (file.fieldname === "catg_img") {
        //delete old file
        if (newItem.avatar) fs.unlinkSync(getImagesFolder(newItem.avatar));

        //update filename
        newItem.avatar = file.filename;
      } else if (file.fieldname === "body_img") {
        //delete old file
        if (newItem.body_img) fs.unlinkSync(getImagesFolder(newItem.body_img));

        //update filename
        newItem.body_img = file.filename;
      }
    });
  }

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter.route("/:id").get((req, res) => {
  console.log("categoryRouter.route->findById:", req.params.id);

  Category.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter.route("/:id").delete((req, res) => {
  // console.log("articleRouter.route->delete:", req.params.id);

  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter
  .route("/update/:id")
  .post(multer_upload.any(), (req, res, next) => {
    //console.log("categoryRouter->update:", req.params, req.body, req.files);

    Category.findById(req.params.id)
      .then((item) => {
        if (req.body.title) item.title = req.body.title;
        if (req.body.slogan) item.slogan = req.body.slogan;

        if (req.body.action_title1) item.action_title1 = req.body.action_title1;
        if (req.body.action_body1) item.action_body1 = req.body.action_body1;
        if (req.body.action_title2) item.action_title2 = req.body.action_title2;
        if (req.body.action_body2) item.action_body2 = req.body.action_body2;
        if (req.body.action_title3) item.action_title3 = req.body.action_title3;
        if (req.body.action_body3) item.action_body3 = req.body.action_body3;

        item.last_modify_id = getCallerIP(req);
        item.last_modify_account = req.user;

        const _file = req.files[0];
        if (_file) {
          req.files.forEach((file) => {
            if (file.fieldname === "catg_img") {
              //delete old file
              if (item.avatar) fs.unlinkSync(getImagesFolder(item.avatar));

              //update filename
              item.avatar = file.filename;
            } else if (file.fieldname === "body_img") {
              //delete old file
              if (item.body_img) fs.unlinkSync(getImagesFolder(item.body_img));

              //update filename
              item.body_img = file.filename;
            }
          });
        }

        item
          .save()
          .then((updatedItem) => res.json(updatedItem))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

function getImagesFolder(filename) {
  return path.join(__dirname, "..", "/public/images/", filename);
}

module.exports = categoryRouter;
