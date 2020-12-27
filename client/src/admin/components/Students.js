import "./Students.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import StudentCard from "./StudentCard";

function Students() {
  const [StudentList, setStudentList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/user/students`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("upload success file: ", res);
        setStudentList(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="students">
      <h1 className="dashboard__header">Danh sách học viên</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/student/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="student__deck">
        {StudentList.map((student) => {
          return (
            <div
              key={student._id}
              className="student__form"
              id={`student__form__${student._id}`}
            >
              <div className="student__info">
                <StudentCard student={student} />

                <div className="student__info__others">
                  <textarea
                    name="student_notes"
                    value={student.user_notes}
                    rows="5"
                    readOnly
                  />
                </div>

                <Link
                  className="card__link"
                  to={`/admin/student_course/${student._id}`}
                >
                  Thông tin khóa học
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Students;
