const multer = require("multer");

const filter = (req, file, callback) => {
  //console.log("multer.js fileFilter", file);
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return callback(/*res.end('Only images are allowed')*/ null, false);
  }

  callback(null, true);
};

const filename_auto = (req, file, callback) => {
  //console.log("multer.js filename", file);
  let filename = file.originalname;
  if (filename.length > 10) {
    filename = filename.substring(filename.length - 10, filename.length);
  }
  filename = file.fieldname + "_" + Date.now() + "_" + filename;

  callback(null, filename);
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: filename_auto,
  fileFilter: filter,
});

const multer_upload = multer({ storage, limits: { fileSize: 5000000 } }); //5Mb

module.exports = {
  multer_upload,
};
