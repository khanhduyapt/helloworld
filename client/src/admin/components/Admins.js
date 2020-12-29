import "./Admins.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import TeacherCard from "./TeacherCard";

function Admins() {
  const [TeacherList, setStudentList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/user/admins`, AxiosCommon.defaults.headers)
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
      <h1 className="dashboard__header">Danh sách quản trị viên</h1>

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

      <div className="user__admin__deck" id="user__admin__deck">
        {TeacherList.map((teacher) => {
          return (
            <div
              key={teacher._id}
              className="user__admin__form"
              id={`user__admin__${teacher._id}}`}
            >
              <div className="user__admin__info">
                <TeacherCard teacher={teacher} />

                <div className="user__admin__info__others">
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
                        `/user/admins/withdraw`,
                        { id: teacher._id },
                        AxiosCommon.defaults.headers
                      )
                        .then((res) => {
                          //console.log("update user successfully: ", res);
                          if (res.status === 200) {
                            var elem = document.getElementById(
                              `user__admin__${teacher._id}}`
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
                    }}
                  >
                    Xóa quyền admin
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

export default Admins;
