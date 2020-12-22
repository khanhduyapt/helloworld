const userRouter = require("express").Router();
let User = require("../models/user.model");
let CourseDetail = require("../models/course_detail.model");
const { FS_ROLE } = require("./FS_ROLE");
const { multer_upload } = require("./multer");
let { getCallerIP, getUserName } = require("./utils");

userRouter.route("/add").post((req, res) => {
  // console.log("studentRouter.route->add");
  const newItem = new User({
    account: req.body.account,
    password: req.body.password,
    role: req.body.role,

    local_id: req.body.local_id,
    fullname: req.body.fullname,
    avatar: req.body.avatar,
    date_of_birth: req.body.date_of_birth,
    phone_number: req.body.phone_number,
    address: req.body.address,
    email: req.body.email,
    facebook: req.body.facebook,
    zoom_id: req.body.zoom_id,
    skype_id: req.body.skype_id,

    parent_name: req.body.parent_name,
    parent_phone: req.body.parent_phone,
    parent_email: req.body.parent_email,
    date_join: req.body.date_join,

    notes: req.body.notes,

    last_modify_ip: getCallerIP(req),
    last_modify_account: getUserName(req),
  });

  //console.log(JSON.stringify(newItem));
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/students").get((req, res) => {
  User.find()
    .populate("course_details")
    .where("role")
    .equals(FS_ROLE.STUDENT)
    .sort({ FullName: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/students/:id").get((req, res) => {
  console.log("studentRouter.route->findById:", req.params.id);

  User.findById(req.params.id)
    .populate("course_details")
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/students/:id").delete((req, res) => {
  console.log("studentRouter.route->delete:", req.params.id);

  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/update/:id").post(multer_upload.any(), (req, res, next) => {
  try {
    console.log("student->update:", res.req.body, req.files[0]);

    const courseDtlItem = createCourseDetail(req, req.params.id);
    //console.log("courseDtlItem:", courseDtlItem);

    courseDtlItem
      .then((course_detail) => {
        console.log("course_detail:", course_detail);

        User.findById(req.params.id)
          .then((item) => {
            if (req.body.local_id) item.local_id = req.body.local_id;
            if (req.body.fullname) item.fullname = req.body.fullname;
            if (req.files[0] && req.files[0].filename)
              item.avatar = req.files[0].filename;
            if (req.body.date_of_birth)
              item.date_of_birth = req.body.date_of_birth;
            if (req.body.phone_number)
              item.phone_number = req.body.phone_number;
            if (req.body.address) item.address = req.body.address;
            if (req.body.email) item.email = req.body.email;
            if (req.body.facebook) item.facebook = req.body.facebook;
            if (req.body.zoom_id) item.zoom_id = req.body.zoom_id;
            if (req.body.skype_id) item.skype_id = req.body.skype_id;

            if (req.body.parent_name) item.parent_name = req.body.parent_name;
            if (req.body.parent_phone)
              item.parent_phone = req.body.parent_phone;
            if (req.body.parent_email)
              item.parent_email = req.body.parent_email;
            if (req.body.date_join) item.date_join = req.body.date_join;

            if (req.body.notes) item.notes = req.body.notes;

            item.last_modify_ip = getCallerIP(req);
            item.last_modify_account = req.user;

            if (!item.course_details.includes(course_detail._id))
              item.course_details.push(course_detail._id);

            item
              .save()
              .then((updatedItem) => {
                console.log("User updated", item._id);

                res.json(updatedItem);
              })
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

async function createCourseDetail(req, user_id) {
  try {
    let detailItem = null;
    if (req.body.pk_course_detail) {
      detailItem = await CourseDetail.findById(req.body.pk_course_detail);
    }

    if (detailItem) {
      console.log("update CourseDetail");

      detailItem.course_name = req.body.course_name;
      detailItem.course_str_date = req.body.course_str_date;
      detailItem.course_end_date = req.body.course_end_date;

      if (req.body.duration_month)
        detailItem.duration_month = req.body.duration_month;
      if (req.body.number_lessons)
        detailItem.number_lessons = req.body.number_lessons;
      if (req.body.lessons_remain)
        detailItem.lessons_remain = req.body.lessons_remain;

      if (req.body.tuition_fee) detailItem.tuition_fee = req.body.tuition_fee;
      if (req.body.tuition_fee_paid)
        detailItem.tuition_fee_paid = req.body.tuition_fee_paid;
      if (req.body.tuition_fee_unpaid)
        detailItem.tuition_fee_unpaid = req.body.tuition_fee_unpaid;

      if (req.body.mo_time_str) detailItem.mo_time_str = req.body.mo_time_str;
      if (req.body.mo_time_end) detailItem.mo_time_end = req.body.mo_time_end;
      if (req.body.tu_time_str) detailItem.tu_time_str = req.body.tu_time_str;
      if (req.body.tu_time_end) detailItem.tu_time_end = req.body.tu_time_end;
      if (req.body.we_time_str) detailItem.we_time_str = req.body.we_time_str;
      if (req.body.we_time_end) detailItem.we_time_end = req.body.we_time_end;
      if (req.body.th_time_str) detailItem.th_time_str = req.body.th_time_str;
      if (req.body.th_time_end) detailItem.th_time_end = req.body.th_time_end;
      if (req.body.fr_time_str) detailItem.fr_time_str = req.body.fr_time_str;
      if (req.body.fr_time_end) detailItem.fr_time_end = req.body.fr_time_end;
      if (req.body.sa_time_str) detailItem.sa_time_str = req.body.sa_time_str;
      if (req.body.sa_time_end) detailItem.sa_time_end = req.body.sa_time_end;
      if (req.body.su_time_str) detailItem.su_time_str = req.body.su_time_str;
      if (req.body.su_time_end) detailItem.su_time_end = req.body.su_time_end;
      if (req.body.notes) detailItem.notes = req.body.notes;

      return await detailItem.save();
    } else {
      console.log("addnew CourseDetail");

      const newItem = new CourseDetail();

      newItem.user_id = user_id;
      newItem.course_id = req.body.course_id;
      newItem.course_name = req.body.course_name;
      newItem.course_str_date = req.body.course_str_date;
      newItem.course_end_date = req.body.course_end_date;

      if (req.body.duration_month)
        newItem.duration_month = req.body.duration_month;
      if (req.body.number_lessons)
        newItem.number_lessons = req.body.number_lessons;
      if (req.body.lessons_remain)
        newItem.lessons_remain = req.body.lessons_remain;

      if (req.body.tuition_fee) newItem.tuition_fee = req.body.tuition_fee;
      if (req.body.tuition_fee_paid)
        newItem.tuition_fee_paid = req.body.tuition_fee_paid;
      if (req.body.tuition_fee_unpaid)
        newItem.tuition_fee_unpaid = req.body.tuition_fee_unpaid;

      if (req.body.mo_time_str) newItem.mo_time_str = req.body.mo_time_str;
      if (req.body.mo_time_end) newItem.mo_time_end = req.body.mo_time_end;
      if (req.body.tu_time_str) newItem.tu_time_str = req.body.tu_time_str;
      if (req.body.tu_time_end) newItem.tu_time_end = req.body.tu_time_end;
      if (req.body.we_time_str) newItem.we_time_str = req.body.we_time_str;
      if (req.body.we_time_end) newItem.we_time_end = req.body.we_time_end;
      if (req.body.th_time_str) newItem.th_time_str = req.body.th_time_str;
      if (req.body.th_time_end) newItem.th_time_end = req.body.th_time_end;
      if (req.body.fr_time_str) newItem.fr_time_str = req.body.fr_time_str;
      if (req.body.fr_time_end) newItem.fr_time_end = req.body.fr_time_end;
      if (req.body.sa_time_str) newItem.sa_time_str = req.body.sa_time_str;
      if (req.body.sa_time_end) newItem.sa_time_end = req.body.sa_time_end;
      if (req.body.su_time_str) newItem.su_time_str = req.body.su_time_str;
      if (req.body.su_time_end) newItem.su_time_end = req.body.su_time_end;
      if (req.body.notes) newItem.notes = req.body.notes;

      return await newItem.save();
    }
  } catch (error) {
    console.log("createCourseDetail error:", error);
  }
}

module.exports = userRouter;

// let conditions = {};
// let options = { multi: true, upsert: true };
// Device.updateMany(conditions , { cid: '' },options );
