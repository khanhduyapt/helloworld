const express = require("express");
const http = require("http");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server is listening!!!" + port);
});
