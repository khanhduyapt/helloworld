module.exports = {
  entry: ["./src/Online_class.js"],
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
