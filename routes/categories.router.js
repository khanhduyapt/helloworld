const categoryRouter = require("express").Router();
let Category = require("../models/category.model");
let { getCallerIP, getUserName } = require("./utils");

categoryRouter.route("/").get((req, res) => {
  Category.find()
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter.route("/add").post((req, res) => {
  console.log("categoryRouter->add", req.body);

  const newItem = new Category({
    title: req.body.title,
    slogan: req.body.slogan,
    avatar: "noimage.jpg",
    body_img: "noimage.jpg",

    action_title1: req.body.action_title1,
    action_body1: req.body.action_body1,
    action_title2: req.body.action_title2,
    action_body2: req.body.action_body2,
    action_title3: req.body.action_title3,
    action_body3: req.body.action_body3,

    last_modify_ip: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

categoryRouter.route("/:id").get((req, res) => {
  // console.log("articleRouter.route->findById:", req.params.id);

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

categoryRouter.route("/update/:id").post((req, res) => {
  console.log("categoryRouter->update:", req.params);
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

      // if (req.body.avatar) item.avatar = req.body.avatar;
      // if (req.body.body_img) item.body_img = req.body.body_img;

      item
        .save()
        .then((updatedItem) => res.json(updatedItem))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = categoryRouter;
