const userRouter = require("express").Router();
let User = require("../models/user.model");
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
    .where("role")
    .equals(FS_ROLE.STUDENT)
    .sort({ FullName: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/students/:id").get((req, res) => {
  console.log("studentRouter.route->findById:", req.params.id);

  User.findById(req.params.id)
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
  console.log(
    "studentRouter.route->update:",
    req.params,
    res.req.body,
    req.files[0]
  );
  // User.findById(req.params.id)
  //   .then((item) => {
  //     if (req.body.local_id) item.local_id = req.body.local_id;
  //     if (req.body.fullname) item.fullname = req.body.fullname;
  //     if (req.body.avatar) item.avatar = req.body.avatar;
  //     if (req.body.date_of_birth) item.date_of_birth = req.body.date_of_birth;
  //     if (req.body.phone_number) item.phone_number = req.body.phone_number;
  //     if (req.body.address) item.address = req.body.address;
  //     if (req.body.email) item.email = req.body.email;
  //     if (req.body.facebook) item.facebook = req.body.facebook;
  //     if (req.body.zoom_id) item.zoom_id = req.body.zoom_id;
  //     if (req.body.skype_id) item.skype_id = req.body.skype_id;

  //     if (req.body.parent_name) item.parent_name = req.body.parent_name;
  //     if (req.body.parent_phone) item.parent_phone = req.body.parent_phone;
  //     if (req.body.parent_email) item.parent_email = req.body.parent_email;
  //     if (req.body.date_join) item.date_join = req.body.date_join;

  //     if (req.body.notes) item.notes = req.body.notes;

  //     item.last_modify_ip = getCallerIP(req);
  //     item.last_modify_account = req.user;

  //     console.log("update item:", item);

  //     // item
  //     //   .save()
  //     //   .then((updatedItem) => res.json(updatedItem))
  //     //   .catch((err) => res.status(400).json("Error: " + err));
  //   })
  //   .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = userRouter;
