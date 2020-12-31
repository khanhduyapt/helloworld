const uloginRouter = require("express").Router();
let User = require("../models/user.model");
const select_fields = "_id account email password role fullname avatar";

const jwt = require("jsonwebtoken");

uloginRouter.route("/").post((req, res) => {
  console.log("uloginRouter:", req.body);
  const username = req.body.username;
  const password = req.body.password;

  User.find()
    .where("account")
    .equals(username)
    .select(select_fields)
    .then((users) => {
      if (users.length > 0) {
        if (password === users[0].password) {
          const user = {
            _id: users[0]._id,
            account: users[0].account,
            email: users[0].email,
            avatar: users[0].avatar,
            fullname: users[0].fullname,
            role: users[0].role,
          };

          const token = jwt.sign(user, process.env.TOKEN_SECRET);

          res.json({
            auth: true,
            token,
            user: user,
          });
        } else {
          res.status(201).json({ auth: false, msg: "Sai mật khẩu đăng nhập." });
        }
      } else {
        res.status(201).json({ auth: false, msg: "Tài khoản không tồn tại." });
      }

      //
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = uloginRouter;
