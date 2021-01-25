require("dotenv").config();

const { randomInt } = require("crypto");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const { FS_ROLE } = require("./routes/FS_ROLE");
//------------------------------------------
// Todo: authenticate user here
const users = [
  { id: 123, name: "Duy", email: "d@d.d", password: "d", role: FS_ROLE.ADMIN },
  {
    id: "5ff33625dd3bb02ef020d340",
    name: "Doan Khanh Duy",
    email: "admin",
    password: "d",
    role: FS_ROLE.ADMIN,
  },
];

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./src/passport-config");

// Todo: authenticate user here
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(cors());
//------------------------------------------

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

//#endregion initData

//#region SocketIO
require("./src/SocketIO")(io);
//#endregion

app.get("/dashboard/:id/:token", (req, res) => {
  const token = req.params.token;
  if (token == null) return res.sendStatus(401); //has not token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //has token but timeout or invalid
    req.user = user;

    console.log("/dashboard/:id/:token -> user=", user);
    res.redirect("/join?cid=" + req.params.id + "&uid=" + user._id);
  });
});

//checkAuthenticated
app.get("/join", (req, res) => {
  //console.log("/join", req.query, req.query.cid, req.query.uid);
  res.render("Online_class", {
    roomId: req.query.cid,
    userId: req.query.uid,
  });
}); //TODO'

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    session: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

//#region mongosee
const uri = process.env.LOCAL_MONGODB; //LOCAL_MONGODB=mongodb://localhost:27017/helloworld
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//

const publicRouter = require("./routes/public.router");
app.use("/public", publicRouter);

const uloginRouter = require("./routes/ulogin.router");
app.use("/ulogin", uloginRouter);

const articleRouter = require("./routes/articles.router");
app.use("/articles", articleRouter);

const uploadRouter = require("./routes/upload.router");
app.use("/upload", uploadRouter);

const userRouter = require("./routes/users.router");
//app.use("/user", authenticateToken, userRouter);
app.use("/user", userRouter);

const courseRouter = require("./routes/courses.router");
app.use("/courses", courseRouter);

const categoryRouter = require("./routes/categories.router");
app.use("/categories", categoryRouter);

const contactRouter = require("./routes/contact.router");
app.use("/contacts", contactRouter);

const youtubeRouter = require("./routes/youtube.router");
app.use("/youtube", youtubeRouter);

//#endregion

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    // console.log("authHeader:", authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); //has not token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); //has token but timeout or invalid
      req.user = user;
      next();
    });
  } catch (err) {
    console.log("authenticateToken: ", err);
    return res.sendStatus(401); //has not token
  }
}

//==============================================
function checkAuthenticated(req, res, next) {
  console.log("checkAuthenticated", req.params, req.body, req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("login require!");
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

//==============================================
var port = process.env.PORT || 3001;
server.listen(port);
console.log("http://localhost:" + port);
