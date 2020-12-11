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

const FS_ROLE = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  GUEST: "guest",
};

//------------------------------------------
// Todo: authenticate user here
const users = [
  { id: 123, name: "Duy", email: "d@d.d", password: "d", role: FS_ROLE.ADMIN },
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

// import { getCallerIP } from ("routes/getCallerIP");

app.get("/", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", { name: req.user.name });
});

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

app.get("/join", checkAuthenticated, (req, res) => {
  res.render("Online_class", {
    roomId: "lop12A3",
    userId: randomInt(1000),
  });
}); //TODO

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

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

const articleRouter = require("./routes/articles.router");
app.use("/articles", articleRouter);
//#endregion

app.post("/api/login", (req, res) => {
  // Todo: authenticate user here
  const username = req.body.username;
  const password = req.body.password;

  if (username && username == "d@d.d" && password && password == "d") {
    const user = { id: 123, name: "Duy", email: "d@d.d", role: FS_ROLE.ADMIN };
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(402); //Login error
  }
});

app.get("/api/posts", authenticateToken, (req, res) => {
  console.log("user:", req.user);
  res.json({ message: "token login Ok" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log("authHeader:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); //has not token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403); //has token but timeout or invalid
    req.user = user;
    next();
  });
}

//==============================================
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

//==============================================
var port = process.env.port || 3001;
server.listen(port);
console.log("http://localhost:" + port);
