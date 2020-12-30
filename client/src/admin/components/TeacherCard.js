import "./TeacherCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { strToDate } from "../CommonUtil";
import Moment from "moment";
import SymbolTo from "../../components/commons/SymbolTo";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";

function TeacherCard({ teacher }) {
  //console.log("TeacherCard:", teacher);

  return (
    <div className="teacher__card" key={`teacher__card_${teacher._id}`}>
      <img
        className="teacher__card__avatar"
        src={AxiosCommon.defaults.baseURL + "/images/" + teacher.avatar}
        alt=""
      ></img>

      <div className="teacher__cardinfo">
        <div className="teacher__card__field">
          <CardIcon icon="female_teacher.jpg" alt="full name" />

          <Link className="card__link" to={`/admin/teacher/${teacher._id}`}>
            {teacher.fullname}
          </Link>
        </div>

        <div className="teacher__card__field">
          <CardIcon icon="id.png" alt="Mã học viên" />
          {teacher.local_id}
        </div>

        <div className="teacher__card__field">
          <CardIcon icon="account.jpg" alt="Tài khoản" />
          {teacher.account}
        </div>

        <div className="teacher__card__field">
          <CardIcon icon="phone_number.png" alt="Phone" />
          {teacher.phone_number}
        </div>

        <div className="teacher__card__field">
          <CardIcon icon="email.png" alt="Email" />
          {teacher.email}
        </div>
      </div>

      {teacher.course_details && teacher.course_details.length > 0 && (
        <div className="teacher__sched">
          {teacher.course_details.map((course) => {
            return (
              <div className="teacher__cardsched">
                <div className="teacher__card__time">
                  <CardIcon icon="online_class.jpg" alt="Khóa học" />
                  {course.course_name}
                </div>

                <div className="teacher__card__time">
                  <CardIcon icon="calendar_time.jpg" alt="Ngày học" />
                  {Moment(course.course_str_date).format("DD/MM/YYYY")}
                  <SymbolTo />
                  {Moment(course.course_end_date).format("DD/MM/YYYY")}
                </div>

                {strToDate(course.mo_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 2
                    </div>

                    {Moment(course.mo_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.mo_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.tu_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 3
                    </div>

                    {Moment(course.tu_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.tu_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.we_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 4
                    </div>

                    {Moment(course.we_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.we_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.th_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 5
                    </div>

                    {Moment(course.th_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.th_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.fr_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 6
                    </div>

                    {Moment(course.fr_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.fr_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.sa_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
                      <CardIcon icon="time.png" alt="Thời gian" />
                      Thứ 7
                    </div>

                    {Moment(course.sa_time_str).format("h:mm a")}
                    <SymbolTo />
                    {Moment(course.sa_time_end).format("h:mm a")}
                  </div>
                )}

                {strToDate(course.su_time_str) && (
                  <div className="teacher__card__time">
                    <div className="teacher__card__day">
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
      )}
    </div>
  );
}

export default TeacherCard;
