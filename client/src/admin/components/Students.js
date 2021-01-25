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

                <div className="student__info__others">
                  <Link
                    className="card__link"
                    to={`/admin/student_course/${student._id}`}
                  >
                    Thông tin khóa học
                  </Link>

                  {student.course_details && student.course_details.length < 1 && (
                    <span
                      className="card__link card__link__danger card__link__bottom"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Bạn có muốn xóa học viên?\n${student.account}`
                          ) === true
                        ) {
                          AxiosCommon.delete(
                            `/user/delete/${student._id}`,
                            AxiosCommon.defaults.headers
                          )
                            .then((res) => {
                              //console.log("update user successfully: ", res);
                              if (res.status === 200) {
                                var elem = document.getElementById(
                                  `student__form__${student._id}`
                                );
                                if (elem) {
                                  elem.remove();
                                }
                              } else {
                                console.log(res.data.msg);
                              }
                            })
                            .catch((error) => {
                              console.log(error.message);
                            });
                          //----------------------
                        }
                      }}
                    >
                      Xóa học viên
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Students;
