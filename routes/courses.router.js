const courseRouter = require("express").Router();
let Course = require("../models/course.model");
const { multer_avatar } = require("./multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

let { getCallerIP, getUserName, strToFloat } = require("./utils");

courseRouter.route("/").get((req, res) => {
  Course.find()
    .sort({ course_name: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

courseRouter.route("/:id").get((req, res) => {
  // console.log("articleRouter.route->findById:", req.params, res.body);

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

/*
_file {
  fieldname: 'img',  originalname: '4572829721712374631278145505850256144728064n-15421656899301699673433.jpg',  encoding: '7bit',  mimetype: 'image/jpeg',  destination: './public/images',  filename: 'avatar_1608991915979_673433.jpg',  path: 'public\\images\\avatar_1608991915979_673433.jpg',  size: 124015
}

_file output {
  format: 'jpeg',  width: 250,  height: 250,  channels: 3,  premultiplied: false,  size: 9413
}
*/
courseRouter
  .route("/add")
  .post(multer_avatar.single("img"), (req, res, next) => {
    console.log("courses ->add", req.params, res.body);
    try {
      const newItem = new Course({
        course_name: req.body.course_name,
        duration_month: req.body.duration_month,
        number_lessons: strToFloat(req.body.number_lessons),
        lesson_minutes: strToFloat(req.body.lesson_minutes),
        tuition_fee: strToFloat(req.body.tuition_fee),
        notes: req.body.notes,

        last_modify_id: getCallerIP(req),
        last_modify_account: getUserName(req),
      });

      const _file = req.file;
      //console.log("_file", _file);
      if (_file) {
        //console.log("res.req.file.filename", res.req.file);
        const avatar = "avatar_400_" + _file.filename;
        fs.unlinkSync(getImagePath(newItem.avatar)); //delete old file
        sharp(_file.path)
          .resize(400, 400)
          .toFile("./public/images/" + avatar)
          .then((output) => {
            //console.log("_file output", output);
            fs.unlinkSync(getImagePath(_file.filename)); ////delete origin file

            newItem.avatar = avatar;
            newItem
              .save()
              .then((item) => res.json(item))
              .catch((err) => res.status(400).json("Error: " + err));
          });
      } else {
        newItem
          .save()
          .then((item) => res.json(item))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    } catch (error) {
      console.log(error);
    }
  });
function getImagePath(filename) {
  return path.join(__dirname, "..", "/public/images/", filename);
}

courseRouter
  .route("/update/:id")
  .post(multer_avatar.single("img"), (req, res, next) => {
    console.log("articleRouter.route->update:", req.params, req.body);

    try {
      Course.findById(req.params.id)
        .then((item) => {
          if (req.body.course_name) item.course_name = req.body.course_name;
          if (req.body.duration_month)
            item.duration_month = req.body.duration_month;
          if (req.body.number_lessons)
            item.number_lessons = strToFloat(req.body.number_lessons);
          if (req.body.lesson_minutes)
            item.lesson_minutes = strToFloat(req.body.lesson_minutes);
          if (req.body.tuition_fee)
            item.tuition_fee = strToFloat(req.body.tuition_fee);
          if (req.body.notes) item.notes = req.body.notes;

          item.last_modify_id = getCallerIP(req);
          item.last_modify_account = req.user;

          const _file = req.file;
          if (_file) {
            console.log("_file", _file);
            const avatar = "avatar_400_" + _file.filename;
            sharp(_file.path)
              .resize(400, 400)
              .toFile("./public/images/" + avatar)
              .then((output) => {
                const filepath = getImagePath(_file.filename);
                fs.unlinkSync(filepath);

                item.avatar = avatar;
                item
                  .save()
                  .then((updatedItem) => res.json(updatedItem))
                  .catch((err) => res.status(400).json("Error: " + err));
              });
          } else {
            item
              .save()
              .then((updatedItem) => res.json(updatedItem))
              .catch((err) => res.status(400).json("Error: " + err));
          }
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (error) {
      console.log(error);
    }
  });

module.exports = courseRouter;
