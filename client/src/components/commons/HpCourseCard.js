import "./HpCourseCard.css";
import React from "react";
import Rating from "./Rating";
import Card from "react-bootstrap/Card";
import AxiosCommon from "./AxiosCommon";

function HpCourseCard({ course }) {
  //console.log("CourseCard", course);
  return (
    <div className="CourseCard">
      <Card className="special__courses__card">
        <Card.Img
          variant="top"
          src={AxiosCommon.defaults.baseURL + "/images/" + course.avatar}
          className="card__link"
          onClick={() => {
            //setModalData(course);
            //setModalShow(true);
          }}
        />
        <Card.Body>
          <p
            className="card__link textLeft"
            onClick={() => {
              //setModalData(course);
              //setModalShow(true);
            }}
          >
            {course.course_name}
          </p>
          <div className="textLeft">
            <div className="courses__card__lession">
              <div className="courses__card__lession-item">
                <p>Thời gian</p>
                <p className="bold">{course.lesson_minutes + " phút"} </p>
              </div>
              <div className="courses__card__lession-item">
                <p>Số tiết học</p>
                <p className="bold">
                  {course.number_lessons * 4 * course.duration_month}
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="courses__card__footer text-muted">
          <img
            src="http://localhost:3000/icon/www.png"
            className="card__icon"
            alt="Web"
          ></img>
          <img
            src="http://localhost:3000/icon/skype.png"
            className="card__icon"
            alt="Skype"
          ></img>
          <img
            src="http://localhost:3000/icon/zoom.png"
            className="card__icon"
            alt="Zoom"
          ></img>

          <Rating star={5} />
        </Card.Footer>
      </Card>
    </div>
  );
}

export default HpCourseCard;
