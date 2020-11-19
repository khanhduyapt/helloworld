module.exports = {
  entry: ["./src/Room.js", "./src/Online_class.js"],
  output: {
    path: __dirname + "/public/",
    filename: "bundle.js",
    publicPath: "/",
  },
  watch: true,
  watchOptions: {
    ignored: ["node_modules/**"],
  },
};
