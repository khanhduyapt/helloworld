const articleRouter = require("express").Router();
let Article = require("../models/article.model");
let { getCallerIP, getUserName } = require("./utils");

articleRouter.route("/").get((req, res) => {
  Article.find()
    .sort({ updatedAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

articleRouter.route("/add").post((req, res) => {
  // console.log("articleRouter.route->add");
  const newItem = new Article({
    category_name: req.body.category_name,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    short_content: req.body.short_content,
    contents: req.body.contents,
    read_count: Number(1),
    last_modify_id: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

articleRouter.route("/:id").get((req, res) => {
  // console.log("articleRouter.route->findById:", req.params.id);

  Article.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

articleRouter.route("/:id").delete((req, res) => {
  // console.log("articleRouter.route->delete:", req.params.id);

  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

articleRouter.route("/update/:id").post((req, res) => {
  // console.log("articleRouter.route->update:", req.params);
  Article.findById(req.params.id)
    .then((item) => {
      if (req.body.title) item.title = req.body.title;
      if (req.body.thumbnail) item.thumbnail = req.body.thumbnail;
      if (req.body.category_name) item.category_name = req.body.category_name;
      if (req.body.short_content) item.short_content = req.body.short_content;
      if (req.body.contents) item.contents = req.body.contents;

      item.last_modify_id = getCallerIP(req);
      item.last_modify_account = req.user;

      item
        .save()
        .then((updatedItem) => res.json(updatedItem))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = articleRouter;
