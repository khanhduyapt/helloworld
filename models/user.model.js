const mongoose = require("mongoose");

// const Genders = Object.freeze({
//   Male: "male",
//   Female: "female",
//   Other: "other",
// });

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    account: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: { type: String, required: true, trim: true, minlength: 3 },
    role: { type: String, required: true },

    local_id: { type: String },
    fullname: { type: String, required: true },
    gender: { type: String },
    avatar: { type: String },
    date_of_birth: { type: String, default: undefined },
    phone_number: { type: String },
    address: { type: String },
    email: { type: String },
    facebook: { type: String },
    zoom_id: { type: String },
    skype_id: { type: String },

    parent_name: { type: String },
    parent_phone: { type: String },
    parent_email: { type: String },
    date_join: { type: String, default: undefined },

    user_notes: { type: String },

    last_modify_ip: { type: String },
    last_modify_account: { type: String },

    following_teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    course_details: [{ type: Schema.Types.ObjectId, ref: "CourseDetail" }],

    teaching_students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
