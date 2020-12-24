import "./Teachers.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CardIcon from "../../components/commons/CardIcon";
import SymbolTo from "../../components/commons/SymbolTo";
import Moment from "moment";

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
              key={teacher._id}
              className="teacher__form"
              id={`teacher__form__${teacher._id}`}
            >
              <div className="teacher__info">
                <img
                  className="teacher__image"
                  key={teacher._id}
                  src={
                    AxiosCommon.defaults.baseURL + "/images/" + teacher.avatar
                  }
                  alt={teacher.fullname}
                ></img>

                <div className="teacher__inputs">
                  <div className="teacher__header">
                    <Link
                      className="card__link"
                      to={`/admin/teacher/${teacher._id}`}
                    >
                      {teacher.fullname}
                    </Link>
                  </div>
                  <div className="teacher__contents">
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="account.jpg" alt="Tài khoản" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.account}
                      </div>
                    </div>
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="facebook.jpg" alt="Facebook" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.facebook}
                      </div>
                    </div>
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="phone_number.png" alt="Facebook" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.phone_number}
                      </div>
                    </div>
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="skype.png" alt="Skype" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.skype_id}
                      </div>
                    </div>
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="email.png" alt="Email" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.email}
                      </div>
                    </div>
                    <div className="teacher__field">
                      <div className="teacher__field__label">
                        <CardIcon icon="zoom.png" alt="Zoom" />
                      </div>
                      <div className="teacher__field__content">
                        {teacher.zoom_id}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="teacher__info__others">
                  <Link
                    className="card__link card__link__danger"
                    to={`/admin/teacher_schedule/${teacher._id}`}
                  >
                    Schedule
                  </Link>
                  <div className="teacher__field">
                    <div className="teacher__field__label">
                      <CardIcon icon="online_class.jpg" alt="Lớp" />
                    </div>
                    <p>
                      {teacher.course_details &&
                        teacher.course_details.length > 0 &&
                        teacher.course_details[0].course_name}
                    </p>
                  </div>
                  <div className="teacher__field">
                    <div className="teacher__field__label">
                      <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                    </div>
                    {teacher.course_details &&
                      teacher.course_details.length > 0 && (
                        <div className="teacher__field__content">
                          <div>
                            {Moment(
                              teacher.course_details[0].course_str_date
                            ).format("DD/MM/YYYY")}
                          </div>
                          <SymbolTo />
                          <div>
                            {Moment(
                              teacher.course_details[0].course_end_date
                            ).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      )}
                  </div>
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
