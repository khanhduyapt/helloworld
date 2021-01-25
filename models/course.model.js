const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    category_id: { type: Schema.Types.ObjectId },

    avatar: { type: String },
    course_name: { type: String, required: true },

    duration_month: { type: String },
    number_lessons: { type: Number },
    lesson_minutes: { type: Number },
    tuition_fee: { type: Number },

    show_public: { type: Boolean, default: false },

    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
