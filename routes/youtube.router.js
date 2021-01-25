const youtubeRouter = require("express").Router();
let Youtube = require("../models/youtube.model");
let { getCallerIP, getUserName } = require("./utils");

youtubeRouter.route("/").get((req, res) => {
  Youtube.find()
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

youtubeRouter.route("/add").post((req, res) => {
  // console.log("youtubeRouter.route->add");
  const newItem = new Youtube({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,

    show_public: req.body.show_public,

    last_modify_id: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

youtubeRouter.route("/:id").get((req, res) => {
  // console.log("youtubeRouter.route->findById:", req.params.id);

  Youtube.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

youtubeRouter.route("/:id").delete((req, res) => {
  // console.log("youtubeRouter.route->delete:", req.params.id);

  Youtube.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

youtubeRouter.route("/update/:id").post((req, res) => {
  // console.log("youtubeRouter.route->update:", req.params);
  Youtube.findById(req.params.id)
    .then((item) => {
      if (req.body.title) item.title = req.body.title;
      if (req.body.url) item.thumbnail = req.body.url;
      if (req.body.description) item.description = req.body.description;

      item.last_modify_id = getCallerIP(req);
      item.last_modify_account = req.user;

      item
        .save()
        .then((updatedItem) => res.json(updatedItem))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

youtubeRouter.route("/show/:id").post((req, res) => {
  console.log("courseRouter.route->show:", req.params, req.body);
  try {
    Youtube.findById(req.params.id)
      .then((item) => {
        item.show_public = req.body.show_public;
        item
          .save()
          .then((updatedItem) => res.json(updatedItem.show_public))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = youtubeRouter;
