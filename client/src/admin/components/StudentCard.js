import "./StudentCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { strToDate } from "../CommonUtil";
import Moment from "moment";
import SymbolTo from "../../components/commons/SymbolTo";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";

function StudentCard({ student }) {
  //console.log("StudentCard:", student);

  return (
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
        {student.course_details && student.course_details.length > 0 && (
          <div>
            <div className="student__card__time">
              <CardIcon icon="online_class.jpg" alt="Khóa học" />
              {student.course_details[0].course_name}
              <CardIcon icon="remain.jpg" alt="remain" />
              {student.course_details[0].lessons_remain}
            </div>

            <div className="student__card__time">
              <CardIcon icon="calendar_time.jpg" alt="Ngày học" />
              {Moment(student.course_details[0].course_str_date).format(
                "DD/MM/YYYY"
              )}
              <SymbolTo />
              {Moment(student.course_details[0].course_end_date).format(
                "DD/MM/YYYY"
              )}
            </div>

            {strToDate(student.course_details[0].mo_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 2
                </div>

                {Moment(student.course_details[0].mo_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].mo_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].tu_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 3
                </div>

                {Moment(student.course_details[0].tu_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].tu_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].we_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 4
                </div>

                {Moment(student.course_details[0].we_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].we_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].th_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 5
                </div>

                {Moment(student.course_details[0].th_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].th_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].fr_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 6
                </div>

                {Moment(student.course_details[0].fr_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].fr_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].sa_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thứ 7
                </div>

                {Moment(student.course_details[0].sa_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].sa_time_end).format("h:mm a")}
              </div>
            )}

            {strToDate(student.course_details[0].su_time_str) && (
              <div className="student__card__time">
                <div className="student__card__day">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Chủ nhật
                </div>

                {Moment(student.course_details[0].su_time_str).format("h:mm a")}
                <SymbolTo />
                {Moment(student.course_details[0].su_time_end).format("h:mm a")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCard;
