const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    title: { type: String, required: true },
    slogan: { type: String },

    avatar: { type: String },
    body_img: { type: String },

    action_title1: { type: String },
    action_body1: { type: String },

    action_title2: { type: String },
    action_body2: { type: String },

    action_title3: { type: String },
    action_body3: { type: String },

    last_modify_ip: { type: String },
    last_modify_account: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
