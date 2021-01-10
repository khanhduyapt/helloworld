import "./ScheduleCard.css";
import React from "react";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CardIcon from "../../components/commons/CardIcon";

function ScheduleCard({ schedule }) {
  //console.log("ScheduleCard", schedule);

  const hasStudent = schedule && schedule.student_info[0];
  const hasTeacher = schedule && schedule.teacher_info[0];
  const student = schedule.student_info[0];
  const teacher = schedule.teacher_info[0];

  return (
    <div className="ScheduleCard">
      {/* Student */}
      <div className="schedulecard__column">
        <div className="schedulecard__column__img">
          <img
            className="schedulecard__avatar"
            src={
              AxiosCommon.defaults.baseURL +
              "/images/" +
              (hasStudent ? student.avatar : "undefined")
            }
            alt=""
          />
        </div>
        <div className="schedulecard__column__info">
          <div className="schedulecard__field">
            <CardIcon icon="student.png" alt="" />
            {hasStudent && student.fullname}
          </div>
          <div className="schedulecard__field">
            <CardIcon icon="online.jpg" alt="" circle={true} />
            {hasStudent && student.account}
          </div>
          <div className="schedulecard__field">
            <CardIcon icon="phone_number.png" alt="" />
            {hasStudent && student.phone_number}
          </div>
        </div>
      </div>

      {/* Teacher */}
      <div className="schedulecard__column">
        <div className="schedulecard__column__img">
          <img
            className="schedulecard__avatar"
            src={
              AxiosCommon.defaults.baseURL +
              "/images/" +
              (hasTeacher ? teacher.avatar : "undefined")
            }
            alt=""
          />
        </div>
        <div className="schedulecard__column__info">
          <div className="schedulecard__field">
            <CardIcon icon="female_teacher.jpg" alt="" />
            {hasTeacher && teacher.fullname}
          </div>
          <div className="schedulecard__field">
            <CardIcon icon="offline.jpg" alt="" circle={true} />
            {hasTeacher && teacher.account}
          </div>
          <div className="schedulecard__field">
            <CardIcon icon="phone_number.png" alt="" />
            {hasTeacher && teacher.phone_number}
          </div>
        </div>
      </div>

      {/* Lớp học */}
      <div className="schedulecard__column">
        <div className="schedulecard__field">Khóa học</div>
        <div className="schedulecard__field">{schedule.course_name}</div>

        <div className="schedulecard__field">
          <button
            className="btn__outline__normal schedulecard__joinclass"
            onClick={() => {
              //console.log("Vào lớp học", schedule._id);

              const win = window.open(
                AxiosCommon.defaults.baseURL +
                  "/dashboard/" +
                  schedule._id +
                  "/" +
                  localStorage.getItem("token"),
                "_blank"
              );
              if (win != null) {
                win.focus();
              }
            }}
          >
            {"Vào lớp học"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
