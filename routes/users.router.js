const { ObjectId } = require("mongodb");
const userRouter = require("express").Router();
let User = require("../models/user.model");
let CourseDetail = require("../models/course_detail.model");
const { FS_ROLE } = require("./FS_ROLE");
const { multer_upload } = require("./multer");
let { getCallerIP, getUserName, strToFloat } = require("./utils");

//#region STUDENTS
userRouter.route("/students/search").post((req, res) => {
  console.log("/students/search", req.body);

  const search_info = req.body.search_info;
  if (search_info) {
    const condition = new RegExp(search_info, "i");
    //console.log("condition:", condition);

    User.find({
      $or: [
        { account: condition },
        { fullname: condition },
        { local_id: condition },
        { phone_number: condition },
        { email: condition },
        { facebook: condition },
        { zoom_id: condition },
        { skype_id: condition },
        { parent_name: condition },
      ],
    })
      .populate("course_details")
      .where("role")
      .equals(FS_ROLE.STUDENT)
      .sort({ fullname: 1 })
      .select("-password")
      .then((items) => res.json(items))
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
      });
  } else {
    User.find()
      .populate("course_details")
      .where("role")
      .equals(FS_ROLE.STUDENT)
      .sort({ fullname: 1 })
      .select("-password")
      .then((items) => res.json(items))
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
      });
  }
});

userRouter
  .route("/students/add")
  .post(multer_upload.any(), (req, res, next) => {
    console.log("studentRouter.route->add", req.body);

    try {
      const newUser = new User({
        account: req.body.account,
        password: req.body.password,
        role: FS_ROLE.STUDENT,

        local_id: req.body.local_id,
        fullname: req.body.fullname,

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

        user_notes: req.body.user_notes,

        last_modify_ip: getCallerIP(req),
        last_modify_account: getUserName(req),
      });

      const _file = req.files[0];
      if (_file) {
        newUser.avatar = _file.filename;
      }

      const courseDtlItem = createCourseDetail(req, newUser._id);
      courseDtlItem.then((newCourseDetail) => {
        console.log("newCourseDetail created:", newCourseDetail._id);

        newUser.course_details.push(newCourseDetail._id);

        console.log("newUser:", newUser);
        newUser
          .save()
          .then((user) => {
            console.log("user created:", user._id);
            res.json(user._id);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
          });
      });
    } catch (error) {
      console.log("userRouter /add", error);
    }
  });

userRouter.route("/students").get((req, res) => {
  User.find()
    .populate("course_details")
    // .populate({
    //   path: "course_details",
    //   select: "-course_name -course_str_date -course_end_date",
    // }) // exclude c and d, include other fields: query.select('-c -d');
    .where("role")
    .equals(FS_ROLE.STUDENT)
    .sort({ FullName: 1 })
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

userRouter.route("/students/:id").get((req, res) => {
  //console.log("studentRouter.route->findById:", req.params.id);

  User.findById(req.params.id)
    .populate("course_details")
    .where("role")
    .equals(FS_ROLE.STUDENT)
    .then((item) => res.json(item))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

userRouter.route("/students/:id").delete((req, res) => {
  //console.log("studentRouter.route->delete:", req.params.id);

  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

userRouter
  .route("/students/update/:id")
  .post(multer_upload.any(), (req, res, next) => {
    try {
      console.log("student->update:", res.req.body, req.files[0]);

      const _file = req.files[0];

      const courseDtlItem = createCourseDetail(req, req.params.id);
      //console.log("courseDtlItem:", courseDtlItem);

      courseDtlItem
        .then((course_detail) => {
          console.log("course_detail updated:", course_detail);

          User.findById(req.params.id)
            .then((item) => {
              if (req.body.account) item.account = req.body.account;

              if (req.body.local_id) item.local_id = req.body.local_id;
              if (req.body.fullname) item.fullname = req.body.fullname;

              if (_file) item.avatar = _file.filename;

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

              if (req.body.user_notes) item.user_notes = req.body.user_notes;

              item.last_modify_ip = getCallerIP(req);
              item.last_modify_account = req.user;

              if (!item.course_details.includes(course_detail._id))
                item.course_details.push(course_detail._id);

              //console.log("User updating:", item);
              try {
                item
                  .save()
                  .then((updatedItem) => {
                    console.log("User updated", updatedItem._id);

                    res.json(updatedItem);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(400).json("Error: " + err);
                  });
              } catch (error) {
                console.log("updatedItem", error);
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json("Error: " + err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("Error: " + err);
        });
    } catch (error) {
      console.log("/update/:id", error);
    }
  });

async function createCourseDetail(req, user_id) {
  try {
    let detailItem = null;
    if (req.body.pk_course_detail) {
      detailItem = await CourseDetail.findById(req.body.pk_course_detail);
    }

    if (detailItem) {
      //console.log("update CourseDetail");

      detailItem.course_name = req.body.course_name;
      detailItem.course_str_date = req.body.course_str_date;
      detailItem.course_end_date = req.body.course_end_date;

      if (req.body.duration_month)
        detailItem.duration_month = req.body.duration_month;
      if (req.body.number_lessons)
        detailItem.number_lessons = strToFloat(req.body.number_lessons);
      if (req.body.lessons_remain)
        detailItem.lessons_remain = strToFloat(req.body.lessons_remain);

      if (req.body.tuition_fee)
        detailItem.tuition_fee = strToFloat(req.body.tuition_fee);
      if (req.body.tuition_fee_paid)
        detailItem.tuition_fee_paid = strToFloat(req.body.tuition_fee_paid);
      if (req.body.tuition_fee_unpaid)
        detailItem.tuition_fee_unpaid = strToFloat(req.body.tuition_fee_unpaid);

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
      if (req.body.course_notes)
        detailItem.course_notes = req.body.course_notes;

      return await detailItem.save();
    } else {
      //console.log("addnew CourseDetail");

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

      if (req.body.tuition_fee)
        newItem.tuition_fee = strToFloat(req.body.tuition_fee);
      if (req.body.tuition_fee_paid)
        newItem.tuition_fee_paid = strToFloat(req.body.tuition_fee_paid);
      if (req.body.tuition_fee_unpaid)
        newItem.tuition_fee_unpaid = strToFloat(req.body.tuition_fee_unpaid);

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
      if (req.body.course_notes) newItem.course_notes = req.body.course_notes;

      return await newItem.save();
    }
  } catch (error) {
    console.log("createCourseDetail error:", error);
  }
}
//#endregion STUDENTS

//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------

//#region TEACHERS
userRouter.route("/teachers").get((req, res) => {
  User.find()
    .populate({ path: "teaching_students", select: "fullname account avatar" })
    // .populate({ path: "teaching_students", select: "account" })
    // .populate({ path: "teaching_students", select: "avatar" })
    .where("role")
    .equals(FS_ROLE.TEACHER)
    .sort({ fullname: 1 })
    //.select("account fullname avatar phone_number")
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

userRouter.route("/teacher/:id").get((req, res) => {
  //console.log("studentRouter.route->findById:", req.params.id);

  User.findById(req.params.id)
    .populate("teaching_students")
    .where("role")
    .equals(FS_ROLE.TEACHER)
    .then((item) => res.json(item))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

userRouter.route("/teacher/add").post(multer_upload.any(), (req, res, next) => {
  console.log("/teacher/add", req.body);
  try {
    const newUser = new User({
      account: req.body.account,
      password: req.body.password,
      role: FS_ROLE.TEACHER,

      local_id: req.body.local_id,
      fullname: req.body.fullname,

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

      user_notes: req.body.user_notes,

      last_modify_ip: getCallerIP(req),
      last_modify_account: getUserName(req),
    });

    if (res.req.file) newUser.avatar = res.req.file.filename;

    newUser
      .save()
      .then((user) => {
        console.log("/teachers/add created:", user._id);
        res.json(user._id);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    console.log("/teachers/add", error);
  }
});

userRouter
  .route("/teacher/update/:id")
  .post(multer_upload.any(), (req, res, next) => {
    try {
      console.log("/teacher/update/:id:", res.req.body, req.files[0]);

      const _file = req.files[0];

      User.findById(req.params.id)
        .then((item) => {
          if (req.body.account) item.account = req.body.account;

          if (req.body.local_id) item.local_id = req.body.local_id;
          if (req.body.fullname) item.fullname = req.body.fullname;

          if (_file) item.avatar = _file.filename;

          if (req.body.date_of_birth)
            item.date_of_birth = req.body.date_of_birth;
          if (req.body.phone_number) item.phone_number = req.body.phone_number;
          if (req.body.address) item.address = req.body.address;
          if (req.body.email) item.email = req.body.email;
          if (req.body.facebook) item.facebook = req.body.facebook;
          if (req.body.zoom_id) item.zoom_id = req.body.zoom_id;
          if (req.body.skype_id) item.skype_id = req.body.skype_id;

          if (req.body.user_notes) item.user_notes = req.body.user_notes;

          item.last_modify_ip = getCallerIP(req);
          item.last_modify_account = req.user;

          // if (!item.teaching_students.includes(req.body.student_id))
          //   item.teaching_students.push(req.body.student_id);

          //console.log("User updating:", item);
          try {
            item
              .save()
              .then((updatedItem) => {
                console.log("Teacher updated", updatedItem._id);

                res.json(updatedItem);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json("Error: " + err);
              });
          } catch (error) {
            console.log("updatedItem", error);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("Error: " + err);
        });

      //
    } catch (error) {
      console.log("/update/:id", error);
    }
  });

//#endregion TEACHERS

//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------

//#region ADMIN

//#endregion ADMIN

userRouter.route("/check/:acc/:id").get((req, res) => {
  console.log("userRouter /check/:acc", req.params);
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    //console.log("userRouter err", id);
    id = new ObjectId();
  }
  //console.log("userRouter", id);

  User.find()
    .where("account")
    .equals(req.params.acc)
    .where("_id")
    .ne(id)
    .then((item) => {
      console.log(item);
      if (item && item.length > 0) {
        res.status(201).json({
          msg:
            "Đã có người sử dụng tài khoản đăng nhập là [" +
            req.params.acc +
            "].\nBạn cần lựa chọn tài khoản khác.",
        });
      } else {
        res.status(200).json({
          msg: "Có thể sử dụng tài khoản [" + req.params.acc + "] để đăng ký.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

module.exports = userRouter;

// let conditions = {};
// let options = { multi: true, upsert: true };
// Device.updateMany(conditions , { cid: '' },options );