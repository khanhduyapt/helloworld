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
//#region articles

app.get("/api/articles", (req, res) => {
  let page = req.query.p;
  if (!page) page = 1;

  console.log("/api/articles", new Date().toUTCString());
  const data = [
    {
      id: "3SRDx5JBR3If86u8jC4i",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      last_modify_account: "duydk",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      read_count: 1,
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      last_modify_id: ["127.0.0.1"],
    },
    {
      id: "3cE3SM3nTWY2MLleUhAh",
      read_count: 1,
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      last_modify_account: "duydk",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      last_modify_id: ["127.0.0.1"],
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "3jKrdqgL1yLfCq30wKkl",
      last_modify_id: ["127.0.0.1"],
      read_count: 1,
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
    },
    {
      id: "3sXSuw8RXQPS7Zyx7Z63",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng về các cửa hàng",
      create_date: "Wed, 02 Dec 2020 06:56:03 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      modify_date: {
        _seconds: 1606894475,
        _nanoseconds: 640000000,
      },
      read_count: 1,
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về các cửa hàng được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      last_modify_id: ["127.0.0.1"],
      contents: "Danh sách từ vựng:",
    },
    {
      id: "3vo1efDQHgbtZ9udAmVI",
      last_modify_id: ["127.0.0.1"],
      read_count: 1,
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
    },
    {
      id: "4bpVwpdXf72bKZil0lkV",
      last_modify_account: "duydk",
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      modify_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
    },
    {
      id: "4ePIKQF3wKrgIvvrbl47",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      last_modify_id: ["127.0.0.1"],
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
    },
    {
      id: "77Ll1a2h6vrSTJ7UQsF4",
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      modify_date: "Wed, 02 Dec 2020 07:34:54 GMT",
      create_date: "Wed, 02 Dec 2020 07:34:54 GMT",
      read_count: 1,
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
    },
    {
      id: "8VQ3MMYA7XAxlpFtkG0F",
      last_modify_account: "duydk",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      read_count: 1,
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      create_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      modify_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "8gxlhFbsWKiWixoPXXh0",
      modify_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      read_count: 1,
      last_modify_account: "duydk",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      create_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
    },
    {
      id: "9x1eWsYR3hBrenE6iBCY",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      modify_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      last_modify_id: ["127.0.0.1"],
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      create_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      read_count: 1,
      last_modify_account: "duydk",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "EBNtbacTlSZlGccgEvOi",
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      create_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      read_count: 1,
      modify_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "GwKbjbLVgT28nU9CN9ne",
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      read_count: 1,
      last_modify_account: "duydk",
      last_modify_id: ["127.0.0.1"],
    },
    {
      id: "I1s3mzpkupvEjnm4NIfm",
      read_count: 1,
      modify_date: "Wed, 02 Dec 2020 07:35:00 GMT",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      last_modify_id: ["127.0.0.1"],
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      create_date: "Wed, 02 Dec 2020 07:35:00 GMT",
      last_modify_account: "duydk",
    },
    {
      id: "JLDDsx1AO3MdG65ij2GY",
      modify_date: "Wed, 02 Dec 2020 07:09:33 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      contents: "Danh sách từ vựng:",
      title: "Từ vựng về các cửa hàng",
      last_modify_id: ["127.0.0.1"],
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về các cửa hàng được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
    },
    {
      id: "KIvjPJb1LghAUQQrOCHZ",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      last_modify_account: "duydk",
      read_count: 1,
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
    },
    {
      id: "KSBzWPAuEft6wBxDBI7Z",
      read_count: 1,
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      last_modify_id: ["127.0.0.1"],
      modify_date: "Wed, 02 Dec 2020 07:35:00 GMT",
      create_date: "Wed, 02 Dec 2020 07:35:00 GMT",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "NU5dHQ6BruuZ6TONwVcY",
      last_modify_account: "duydk",
      read_count: 1,
      create_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      last_modify_id: ["127.0.0.1"],
      modify_date: "Wed, 02 Dec 2020 07:34:55 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "P87mcKYovkNdFIpM6BXa",
      last_modify_account: "duydk",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      last_modify_id: ["127.0.0.1"],
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      modify_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      create_date: "Wed, 02 Dec 2020 07:34:57 GMT",
      read_count: 1,
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
    },
    {
      id: "QNrEz2zfp42vK4hY50nO",
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:12:02 GMT",
      last_modify_id: ["127.0.0.1"],
      last_modify_account: "duydk",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      modify_date: {
        _seconds: 1606894454,
        _nanoseconds: 473000000,
      },
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
    },
    {
      id: "V6RQ8G5XYhEZ9bzfBh98",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      read_count: 1,
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      last_modify_account: "duydk",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
    },
    {
      id: "VgPLQARSNdjAzBYXnDLf",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:35:00 GMT",
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      last_modify_account: "duydk",
      read_count: 1,
      modify_date: "Wed, 02 Dec 2020 07:35:00 GMT",
    },
    {
      id: "XF0YNjhX9Fz2gcihchpN",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      last_modify_id: ["127.0.0.1"],
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "bF0VTr9kFn9UwoGdRFuo",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      read_count: 1,
      last_modify_id: ["127.0.0.1"],
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
    },
    {
      id: "j4QyklC93iPcOpju2QYm",
      last_modify_account: "duydk",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      last_modify_id: ["127.0.0.1"],
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      read_count: 1,
    },
    {
      id: "nZGQdiai9XzDdGIUvDc5",
      last_modify_account: "duydk",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      modify_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:34:58 GMT",
      last_modify_id: ["127.0.0.1"],
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "wnU4PRorHPNiYFFMHH2C",
      modify_date: {
        _seconds: 1606883293,
        _nanoseconds: 716000000,
      },
      thumbnail: "",
      last_modify_id: "",
      title: "",
      contents:
        "-rug /rʌg/: thảm lau chân  -logs /lɒgz/: những khúc gỗ mới đốn, mới xẻ  -fireplace /ˈfaɪə.pleɪs/: lò sưởi",
      read_count: 0,
      category_name: "Học tiếng Anh qua hình ảnh các vật dụng trong nhà",
      last_modify_account: "",
      short_content:
        "Học tiếng Anh qua hình ảnh là cách giúp các em nhỏ tiếp cận với tiếng Anh nhanh hơn và hiệu quả hơn. Đối với những kiến thức tiếng Anh cho trẻ em, những hình ảnh đòi hỏi sự gần gũi và sinh động nhất. Chủ đề các vật dụng trong nhà có rất nhiều, nhóm từ vựng tiếng Anh qua hình ảnh các vật dụng trong nhà dưới đây là những nhóm từ đơn giản và gần gũi cho các em nhỏ.",
      create_date: {
        _seconds: 1606883268,
        _nanoseconds: 767000000,
      },
    },
    {
      id: "yEGq1jQcGK0Dl9Gv3QWp",
      last_modify_account: "duydk",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      read_count: 1,
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      create_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      modify_date: "Wed, 02 Dec 2020 07:34:59 GMT",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
    },
    {
      id: "yZVqONWh5mcAqEC7DBcX",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_id: ["127.0.0.1"],
      create_date: "Wed, 02 Dec 2020 07:34:56 GMT",
      last_modify_account: "duydk",
      read_count: 1,
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      modify_date: "Wed, 02 Dec 2020 07:34:56 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
    },
    {
      id: "zB4hj7b1Upqr4yJXQ8q7",
      modify_date: "Wed, 02 Dec 2020 07:34:56 GMT",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      create_date: "Wed, 02 Dec 2020 07:34:56 GMT",
      thumbnail:
        "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      read_count: 1,
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      last_modify_account: "duydk",
      last_modify_id: ["127.0.0.1"],
    },
  ];

  res.json(data);
});

app.post("/api/article", (req, res) => {
  const data = {
    id: req.body.id,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    short_content: req.body.short_content,
    contents: req.body.contents,
    category_name: req.body.category_name,
    read_count: 1,
    last_modify_id: getCallerIP(req),
    last_modify_account: "duydk",
  };

  console.log("app.post /api/article", JSON.stringify(data));

  res.json({ status: "OK" });
});

app.put("/api/article", (req, res) => {
  const data = {
    id: req.body.id,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    short_content: req.body.short_content,
    contents: req.body.contents,
    category_name: req.body.category_name,
    last_modify_id: getCallerIP(req),
    last_modify_account: "duydk",
  };
  console.log("app.put /api/article", JSON.stringify(data));

  res.json({ status: "OK" });
});
//#endregion articles

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

function getCallerIP(request) {
  var ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;
  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
  return ip;
}

//==============================================
var port = process.env.port || 3001;
server.listen(port);
console.log("http://localhost:" + port);
