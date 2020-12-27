import "./Courses.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CourseCard from "./CourseCard";

function Courses() {
  const [CourseList, setCourseList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/courses`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("upload success file: ", res);
        setCourseList(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="course__list">
      <h1 className="dashboard__header">Danh sách khóa học</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/course/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="courses__deck">
        {CourseList.map((course) => {
          return (
            <div key={`courses_row_${course._id}`} className="courses__row">
              <div className="courses__info">
                <CourseCard course={course} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
