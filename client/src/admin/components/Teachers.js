import "./Teachers.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import TeacherCard from "./TeacherCard";

function Teachers() {
  const [TeacherList, setStudentList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/user/teachers`, AxiosCommon.defaults.headers)
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
      <h1 className="dashboard__header">Danh sách giảng viên</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/teacher/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="teacher__deck">
        {TeacherList.map((teacher) => {
          return (
            <div
              key={`teacher_deck_row_${teacher._id}`}
              className="teacher__form"
            >
              <div className="teacher__info">
                <TeacherCard teacher={teacher} />

                <div className="teacher__info__others">
                  <Link
                    className="card__link"
                    to={`/admin/teacher_schedule/${teacher._id}`}
                  >
                    Schedule
                  </Link>

                  <span
                    className="card__link card__link__danger card__link__bottom"
                    onClick={() => {
                      AxiosCommon.post(
                        `/user/admins/authorize`,
                        { id: teacher._id },
                        AxiosCommon.defaults.headers
                      )
                        .then((res) => {
                          //console.log("update user successfully: ", res);
                          if (res.status === 200) {
                            console.log("authorize", res.data.msg);
                          } else {
                            console.log(res.data.msg);
                          }
                        })
                        .catch((error) => {
                          console.log(error.message);
                        });
                      //----------------------
                    }}
                  >
                    Cấp quyền admin
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Teachers;
