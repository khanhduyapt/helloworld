if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { randomInt } = require("crypto");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

//------------------------------------------
const users = [{ id: 123, name: "Duy", email: "d@d.d", password: "d" }]; //TODO
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./src/passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
//------------------------------------------

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

//#region initData
const {
  FS_COLLECTION_NAME,
  FS_ROLE,
} = require("./firestore/firestore_collections");
const FirestoreClient = require("./firestore/firestoreClient");
const { initData } = require("./firestore/InsertDummyData");
const { json } = require("express");
//#endregion initData

//#region SocketIO
require("./src/SocketIO")(io);
//#endregion

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

app.get("/api/students", async (req, res) => {
  FirestoreClient.getCollectionByPath(
    FS_COLLECTION_NAME.LANGUAGE_CENTERS +
      "/" +
      "pantado" +
      "/" +
      FS_COLLECTION_NAME.STUDENTS +
      "/"
  ).then((data) => {
    res.json(data);
  }); //TODO

  //console.log(students);

  // students.forEach((doc) => {
  //   console.log(doc.data());
  // });

  //res.json(students());
});

// // VD
// const roomOfLoginUser = "khanhduyapt_lop12a3";
// app.get("/", (req, res) => {
//   res.render("Online_class", {
//     roomId: roomOfLoginUser,
//   });
// });
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
