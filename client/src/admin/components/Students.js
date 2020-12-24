import "./Students.css";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CardIcon from "../../components/commons/CardIcon";
import SymbolTo from "../../components/commons/SymbolTo";
import Moment from "moment";

function Students() {
  const [StudentList, setStudentList] = useState([]);
  const refEditItem = useRef(null);

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
                <img
                  className="student__image"
                  key={student._id}
                  src={
                    AxiosCommon.defaults.baseURL + "/images/" + student.avatar
                  }
                  alt={student.fullname}
                ></img>

                <div className="student__inputs">
                  <div className="student__header">
                    <Link
                      ref={refEditItem}
                      className="card__link"
                      to={`/admin/student/${student._id}`}
                    >
                      {student.fullname}
                    </Link>
                  </div>
                  <div className="student__contents">
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="online_class.jpg" alt="Lớp" />
                      </div>
                      <p>
                        {student.course_details &&
                          student.course_details.length > 0 &&
                          student.course_details[0].course_name}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                      </div>
                      {student.course_details &&
                        student.course_details.length > 0 && (
                          <div className="student__field__content">
                            <div>
                              {Moment(
                                student.course_details[0].course_str_date
                              ).format("DD/MM/YYYY")}
                            </div>
                            <SymbolTo />
                            <div>
                              {Moment(
                                student.course_details[0].course_end_date
                              ).format("DD/MM/YYYY")}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="account.jpg" alt="Tài khoản" />
                      </div>
                      <div className="student__field__content">
                        {student.account}
                      </div>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="facebook.jpg" alt="Facebook" />
                      </div>
                      <div className="student__field__content">
                        {student.facebook}
                      </div>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="phone_number.png" alt="Facebook" />
                      </div>
                      <div className="student__field__content">
                        {student.phone_number}
                      </div>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="skype.png" alt="Skype" />
                      </div>
                      <div className="student__field__content">
                        {student.skype_id}
                      </div>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="email.png" alt="Email" />
                      </div>
                      <div className="student__field__content">
                        {student.email}
                      </div>
                    </div>
                    <div className="student__contents__field">
                      <div className="student__field__label">
                        <CardIcon icon="zoom.png" alt="Zoom" />
                      </div>
                      <div className="student__field__content">
                        {student.zoom_id}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="student__info__others">
                  <textarea
                    name="student_notes"
                    value={student.user_notes}
                    rows="5"
                    readOnly
                  />
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
