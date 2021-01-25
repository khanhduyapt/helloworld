const publicRouter = require("express").Router();
let Course = require("../models/course.model");
let Youtube = require("../models/youtube.model");

publicRouter.route("/courses").get((req, res) => {
  Course.find()
    .where("show_public")
    .equals(true)
    .sort({ course_name: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

publicRouter.route("/youtube").get((req, res) => {
  Youtube.find()
    .where("show_public")
    .equals(true)
    .sort({ course_name: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = publicRouter;
