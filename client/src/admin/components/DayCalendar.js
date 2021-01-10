import "./DayCalendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ScheduleCard from "./ScheduleCard";
import { changeDayCalendarNotifyNum } from "../CommonUtil";

function DayCalendar() {
  const [date_of_analyst, set_date_of_analyst] = useState(new Date());
  const [rows, setRows] = useState([]);

  useEffect(() => {
    function handleChangeDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      const str_date = new Date(year, month, 1, 7, 0, 1).toISOString(); //GMT+7
      const end_date = new Date(year, month, 1, 30, 59, 59).toISOString();
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
            console.log("schedule err:", res);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    function drawSchedule(schedules, date) {
      ////////////////////////////
      //console.log("schedules", schedules);
      const currDayofWeek = date.getDay();
      var rows_tmp = [];
      let count = 0;
      let cardList = [];
      for (let index = 0; index < schedules.length; index++) {
        let schedule = schedules[index];

        let isCurrDayOfWeek = false;
        switch (currDayofWeek) {
          case 0: //Sunday
            if (schedule.su_time_str && schedule.su_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 1: //Monday
            if (schedule.mo_time_str && schedule.mo_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 2: //Tuesday
            if (schedule.tu_time_str && schedule.tu_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 3: //Wednesday
            if (schedule.we_time_str && schedule.we_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 4: //Thursday
            if (schedule.th_time_str && schedule.th_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 5: //Friday
            if (schedule.fr_time_str && schedule.fr_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          case 6: //Saturday
            if (schedule.sa_time_str && schedule.sa_time_str.length > 10)
              isCurrDayOfWeek = true;
            break;
          default:
            break;
        }
        if (!isCurrDayOfWeek) continue;

        count += 1;
        cardList.push(
          <ScheduleCard key={`day_chedule_${count}}`} schedule={schedule} />
        );
      }

      rows_tmp.push(
        <div
          key={`day_calendar_${new Date().toISOString()}`}
          className="day__calenar__body"
        >
          {cardList}
        </div>
      );

      setRows(rows_tmp);

      changeDayCalendarNotifyNum(count);

      ///////////////////////////
    }

    handleChangeDate(date_of_analyst);
  }, [date_of_analyst]);

  return (
    <div className="DayCalendar">
      <h1 className="dashboard__header">
        Lịch học trong ngày{" "}
        <button
          className="btn__outline__normal datepicker__button outline__primary"
          onClick={() => {
            set_date_of_analyst(
              new Date(
                date_of_analyst.getFullYear(),
                date_of_analyst.getMonth(),
                date_of_analyst.getDate() - 1
              )
            );
          }}
        >
          {"≪"}
        </button>
        <DatePicker
          todayButton="Today"
          name="date_of_birth"
          className="daycalenar__datepicker"
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
        <button
          className="btn__outline__normal datepicker__button outline__primary"
          onClick={() => {
            set_date_of_analyst(
              new Date(
                date_of_analyst.getFullYear(),
                date_of_analyst.getMonth(),
                date_of_analyst.getDate() + 1
              )
            );
          }}
        >
          {"≫"}
        </button>
      </h1>

      {rows}
    </div>
  );
}

export default DayCalendar;
