const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const upImageSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    category: { type: String, required: true },
    filename: { type: String, required: true },
    header: { type: String },
    content: { type: String },
    uploader_id: { type: String },
    uploader_account: { type: String },
  },
  {
    timestamps: true,
  }
);

const UpImage = mongoose.model("UpImage", upImageSchema);

module.exports = UpImage;
