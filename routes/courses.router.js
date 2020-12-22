const courseRouter = require("express").Router();
let Course = require("../models/course.model");
let { getCallerIP, getUserName } = require("./utils");

courseRouter.route("/").get((req, res) => {
  Course.find()
    .sort({ course_name: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

courseRouter.route("/add").post((req, res) => {
  // console.log("articleRouter.route->add");
  const newItem = new Course({
    course_name: req.body.course_name,
    duration_month: req.body.duration_month,
    number_lessons: req.body.number_lessons,
    tuition_fee: req.body.tuition_fee,
    notes: req.body.notes,

    last_modify_id: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

courseRouter.route("/:id").get((req, res) => {
  // console.log("articleRouter.route->findById:", req.params.id);

  Course.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

courseRouter.route("/:id").delete((req, res) => {
  // console.log("articleRouter.route->delete:", req.params.id);

  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

courseRouter.route("/update/:id").post((req, res) => {
  // console.log("articleRouter.route->update:", req.params);
  Course.findById(req.params.id)
    .then((item) => {
      if (req.body.course_name) item.course_name = req.body.course_name;
      if (req.body.duration_month)
        item.duration_month = req.body.duration_month;
      if (req.body.number_lessons)
        item.number_lessons = req.body.number_lessons;
      if (req.body.tuition_fee) item.tuition_fee = req.body.tuition_fee;
      if (req.body.notes) item.contents = req.body.notes;

      item.last_modify_id = getCallerIP(req);
      item.last_modify_account = req.user;

      item
        .save()
        .then((updatedItem) => res.json(updatedItem))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = courseRouter;
