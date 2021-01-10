import "./MonthCalendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ScheduleMinCard from "./ScheduleMinCard";
import Moment from "moment";

function MonthCalendar() {
  const [date_of_analyst, set_date_of_analyst] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [sche_month, set_sche_month] = useState(new Date().getMonth() + 1);
  const [sche_year, set_sche_year] = useState(new Date().getFullYear());

  useEffect(() => {
    function handleChangeDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const num = daysInMonth(month, year);

      const str_date = new Date(year, month, 1, 7, 0, 1).toISOString(); //GMT+7
      const end_date = new Date(year, month, num, 30, 59, 59).toISOString();
      //console.log("search: str_date, end_date =", str_date, end_date);

      AxiosCommon.post(
        `/user/students/schedule`,
        {
          str_date: str_date,
          end_date: end_date,
        },
        AxiosCommon.defaults.headers
      )
        .then((res) => {
          if (res.status === 200) {
            drawSchedule(res.data, date);
          } else {
            console.log("/user/students/schedule err:", res);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    function drawSchedule(schedules, date) {
      // console.log("schedules", schedules);

      ////////////////////////////
      const today = date;
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();

      const tmpDate = new Date(year, month, 0);
      const num = daysInMonth(month, year);
      const dayofweek = tmpDate.getDay();

      set_sche_month(month + 1);
      set_sche_year(year);
      // console.log(today, year, month, tmpDate, num, dayofweek);

      var rows_tmp = [];
      for (let i = 0; i <= dayofweek; i++) {
        rows_tmp.push(
          <div key={`month_calendar_blank_${i}`} className="day blank"></div>
        );
      }

      for (let i = 0; i < num; i++) {
        let currDate = new Date(year, month, i + 1);
        const currDayofWeek = currDate.getDay();
        currDate = Moment(currDate).format("YYYYMMDD");

        let cardList = [];
        for (let index = 0; index < schedules.length; index++) {
          let schedule = schedules[index];

          let isCurrDayOfWeek = false;
          let time_str = "";
          let time_end = "";
          switch (currDayofWeek) {
            case 0: //Sunday
              if (schedule.su_time_str && schedule.su_time_str.length > 10) {
                time_str = Moment(schedule.su_time_str).format("hh:mm");
                time_end = Moment(schedule.su_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }

              break;
            case 1: //Monday
              if (schedule.mo_time_str && schedule.mo_time_str.length > 10) {
                time_str = Moment(schedule.mo_time_str).format("hh:mm");
                time_end = Moment(schedule.mo_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            case 2: //Tuesday
              if (schedule.tu_time_str && schedule.tu_time_str.length > 10) {
                time_str = Moment(schedule.tu_time_str).format("hh:mm");
                time_end = Moment(schedule.tu_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            case 3: //Wednesday
              if (schedule.we_time_str && schedule.we_time_str.length > 10) {
                time_str = Moment(schedule.we_time_str).format("hh:mm");
                time_end = Moment(schedule.we_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            case 4: //Thursday
              if (schedule.th_time_str && schedule.th_time_str.length > 10) {
                time_str = Moment(schedule.th_time_str).format("hh:mm");
                time_end = Moment(schedule.th_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            case 5: //Friday
              if (schedule.fr_time_str && schedule.fr_time_str.length > 10) {
                time_str = Moment(schedule.fr_time_str).format("hh:mm");
                time_end = Moment(schedule.fr_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            case 6: //Saturday
              if (schedule.sa_time_str && schedule.sa_time_str.length > 10) {
                time_str = Moment(schedule.sa_time_str).format("hh:mm");
                time_end = Moment(schedule.sa_time_end).format("hh:mm A");
                isCurrDayOfWeek = true;
              }
              break;
            default:
              break;
          }

          if (!isCurrDayOfWeek) continue;

          let sche_start = Moment(schedule.course_str_date).format("YYYYMMDD");
          let sche_end = Moment(schedule.course_end_date).format("YYYYMMDD");
          if (sche_start <= currDate && currDate <= sche_end) {
            cardList.push(
              <ScheduleMinCard
                key={`schedule${schedule._id}`}
                sche_no={cardList.length + 1}
                start_time={time_str}
                end_time={time_end}
              />
            );
          }
        }

        rows_tmp.push(
          <div
            key={`month_calendar_day_${i}`}
            className={`month__calendar__day`}
          >
            <div
              className={`month__calendar__date card__link ${
                i + 1 === day ? " calendar__currentday" : ""
              }`}
            >
              {i + 1}
            </div>

            <div className="month_calendar_schedule">
              <div>{cardList}</div>
            </div>
          </div>
        );
      }

      setRows(rows_tmp);
      ///////////////////////////
    }

    handleChangeDate(date_of_analyst);
  }, [date_of_analyst]);

  function daysInMonth(month, year) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
  }

  return (
    <div className="MonthCalendar">
      <h1 className="dashboard__header">
        Lịch học trong tháng {sche_month + "/" + sche_year}
      </h1>

      <div className="monthcalenar__select">
        <DatePicker
          todayButton="Today"
          name="date_of_birth"
          className="monthcalenar__datepicker"
          selected={date_of_analyst}
          onChange={(date) => {
            set_date_of_analyst(date);
          }}
          peekNextMonth
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="monthcalenar__body">
        <div className="month__calendar__deck">
          <div className="month__calendar__label">Chủ nhật</div>
          <div className="month__calendar__label">Thứ 2</div>
          <div className="month__calendar__label">Thứ 3</div>
          <div className="month__calendar__label">Thứ 4</div>
          <div className="month__calendar__label">Thứ 5</div>
          <div className="month__calendar__label">Thứ 6</div>
          <div className="month__calendar__label">Thứ 7</div>
        </div>

        <div id="calendarDays" className="month__calendar__deck">
          {rows}
        </div>
      </div>
    </div>
  );
}

export default MonthCalendar;
