const contactRouter = require("express").Router();
let Contact = require("../models/contact.model");
let { getCallerIP, getUserName } = require("./utils");

const CONTACT_WAITING = "0"; //"Chờ xử lý";
const CONTACT_DONE = "1"; //"Đã liên hệ";

contactRouter.route("/waiting").get((req, res) => {
  Contact.find()
    .where("status")
    .ne(CONTACT_DONE)
    .sort({ createdAt: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

contactRouter.route("/done").get((req, res) => {
  Contact.find()
    .where("status")
    .equals(CONTACT_DONE)
    .sort({ createdAt: 1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

contactRouter.route("/:id").get((req, res) => {
  // console.log("contactRouter.route->findById:", req.params, res.body);

  Contact.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

contactRouter.route("/:id").delete((req, res) => {
  // console.log("contactRouter.route->delete:", req.params.id);

  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "deleted.", id: req.params.id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

contactRouter.route("/add").post((req, res) => {
  //console.log("contactRouter ->add", req.params, res.body);
  try {
    const newItem = new Contact({
      fullname: req.body.fullname,
      phone: req.body.phone,
      contents: req.body.contents,

      status: CONTACT_WAITING,

      last_modify_id: getCallerIP(req),
      last_modify_account: getUserName(req),
    });

    newItem
      .save()
      .then((item) => res.json("Cảm ơn bạn đã gửi thông tin."))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

contactRouter.route("/update/:id").post((req, res) => {
  console.log("contactRouter.route->update:", req.params, req.body);

  try {
    Contact.findById(req.params.id)
      .then((item) => {
        if (req.body.reply_content) item.reply_content = req.body.reply_content;
        if (req.body.reply_user) item.reply_user = req.body.reply_user;
        if (req.body.status) item.status = req.body.status;

        item.last_modify_id = getCallerIP(req);
        item.last_modify_account = req.user;

        item
          .save()
          .then((updatedItem) => res.json(updatedItem))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = contactRouter;
