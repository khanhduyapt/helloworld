import "./CourseCard.css";
import React from "react";
import { Link } from "react-router-dom";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ReactHtmlParser from "react-html-parser";
import CurrencyInput from "react-currency-input";

function CourseCard({ course }) {
  console.log("CourseCard:", course);

  return (
    <div className="course__card">
      {course && (
        <div className="course__card" key={`course__card_${course._id}`}>
          <img
            className="course__card__avatar"
            src={AxiosCommon.defaults.baseURL + "/images/" + course.avatar}
            alt=""
          ></img>

          <div className="course__cardinfo">
            <div className="course__card__field">
              <div className="course__card__label">
                <CardIcon icon="online_class.jpg" alt="" />
                Khóa học
              </div>
              <Link className="card__link" to={`/admin/course/${course._id}`}>
                {course.course_name}
              </Link>
            </div>

            <div className="course__card__field">
              <div className="course__card__label">
                <CardIcon icon="tuition_fee.png" alt="" />
                Học phí
              </div>
              <CurrencyInput
                name="number_lessons"
                value={course.tuition_fee}
                className="course__card__money"
                suffix=" (vnđ)"
                precision="0"
              />
            </div>

            <div className="course__card__field">
              <div className="course__card__label">
                <CardIcon icon="calendar_time.jpg" alt="" />
                Thời lượng
              </div>
              <CurrencyInput
                name="number_lessons"
                value={course.duration_month}
                className="course__card__money"
                suffix=" (tháng)"
                precision="0"
              />
            </div>

            <div className="course__card__field">
              <div className="course__card__label">
                <CardIcon icon="time.png" alt="" />
                Thời gian 1 buổi học
              </div>
              <CurrencyInput
                name="lesson_minutes"
                value={course.lesson_minutes}
                className="course__card__money"
                suffix=" (phút)"
                precision="0"
              />
            </div>

            <div className="course__card__field">
              <div className="course__card__label">
                <CardIcon icon="number_lessons.png" alt="" />
                Số tiết học
              </div>
              <div className="course__card__label">{course.number_lessons}</div>
            </div>
          </div>

          <div className="course__card__notes">
            {ReactHtmlParser(course.notes)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
