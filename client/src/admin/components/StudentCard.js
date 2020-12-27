import "./StudentCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { strToDate } from "../CommonUtil";
import Moment from "moment";
import SymbolTo from "../../components/commons/SymbolTo";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";

function StudentCard({ student }) {
  //console.log("StudentCard:", student.course_details);

  return (
    <div className="student__card">
      {student && (
        <div className="student__card" key={`student__card_${student._id}`}>
          <img
            className="student__card__avatar"
            src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
            alt=""
          ></img>

          <div className="student__cardinfo">
            <div className="student__card__field">
              <CardIcon icon="student.png" alt="full name" />

              <Link className="card__link" to={`/admin/student/${student._id}`}>
                {student.fullname}
              </Link>
            </div>

            <div className="student__card__field">
              <CardIcon icon="id.png" alt="Mã học viên" />
              {student.local_id}
            </div>

            <div className="student__card__field">
              <CardIcon icon="account.jpg" alt="Tài khoản" />
              {student.account}
            </div>

            <div className="student__card__field">
              <CardIcon icon="phone_number.png" alt="Phone" />
              {student.phone_number}
            </div>

            <div className="student__card__field">
              <CardIcon icon="email.png" alt="Email" />
              {student.email}
            </div>
          </div>

          <div className="student__cardsched">
            {student.course_details &&
              student.course_details.length > 0 &&
              student.course_details.map((course) => {
                //console.log("student__cardsched", course);
                if (!course.course_name) {
                  return <div />;
                }
                return (
                  <div key={`student_card_${course._id}`}>
                    <div className="student__card__time">
                      <CardIcon icon="online_class.jpg" alt="Khóa học" />
                      {course.course_name}
                      <CardIcon icon="remain.jpg" alt="remain" />
                      {course.lessons_remain}
                    </div>

                    <div className="student__card__time">
                      <CardIcon icon="calendar_time.jpg" alt="Ngày học" />
                      {Moment(course.course_str_date).format("DD/MM/YYYY")}
                      <SymbolTo />
                      {Moment(course.course_end_date).format("DD/MM/YYYY")}
                    </div>

                    {strToDate(course.mo_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 2
                        </div>

                        {Moment(course.mo_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.mo_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.tu_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 3
                        </div>

                        {Moment(course.tu_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.tu_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.we_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 4
                        </div>

                        {Moment(course.we_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.we_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.th_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 5
                        </div>

                        {Moment(course.th_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.th_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.fr_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 6
                        </div>

                        {Moment(course.fr_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.fr_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.sa_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Thứ 7
                        </div>

                        {Moment(course.sa_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.sa_time_end).format("h:mm a")}
                      </div>
                    )}

                    {strToDate(course.su_time_str) && (
                      <div className="student__card__time">
                        <div className="student__card__day">
                          <CardIcon icon="time.png" alt="Thời gian" />
                          Chủ nhật
                        </div>

                        {Moment(course.su_time_str).format("h:mm a")}
                        <SymbolTo />
                        {Moment(course.su_time_end).format("h:mm a")}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
