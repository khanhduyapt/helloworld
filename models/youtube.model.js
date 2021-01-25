const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const youtubeSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },

    show_public: { type: Boolean, default: false },

    last_modify_ip: { type: String },
    last_modify_account: { type: String },
  },
  {
    timestamps: true,
  }
);

const Youtube = mongoose.model("Youtube", youtubeSchema);

module.exports = Youtube;
