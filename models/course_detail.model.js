const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseDetailSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },

    user_id: { type: Schema.Types.ObjectId, required: true },
    course_id: { type: Schema.Types.ObjectId, required: true },

    course_name: { type: String, required: true },
    course_str_date: { type: String, required: true },
    course_end_date: { type: String, required: true },

    duration_month: { type: String },
    number_lessons: { type: Number },
    lessons_remain: { type: Number },

    tuition_fee: { type: Number },
    tuition_fee_paid: { type: Number },
    tuition_fee_unpaid: { type: Number },

    mo_time_str: { type: String },
    mo_time_end: { type: String },
    tu_time_str: { type: String },
    tu_time_end: { type: String },
    we_time_str: { type: String },
    we_time_end: { type: String },
    th_time_str: { type: String },
    th_time_end: { type: String },
    fr_time_str: { type: String },
    fr_time_end: { type: String },
    sa_time_str: { type: String },
    sa_time_end: { type: String },
    su_time_str: { type: String },
    su_time_end: { type: String },

    course_notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const CourseDetail = mongoose.model("CourseDetail", courseDetailSchema);

module.exports = CourseDetail;
