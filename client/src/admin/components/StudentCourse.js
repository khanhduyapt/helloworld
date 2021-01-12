import "./StudentCourse.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import StudentCard from "./StudentCard";
import CardIcon from "../../components/commons/CardIcon";
import DatePicker from "react-datepicker"; //https://reactdatepicker.com/#example-date-range-with-disabled-navigation-shown
import SymbolTo from "../../components/commons/SymbolTo";
import CurrencyInput from "react-currency-input";
import { strToFloat, strToDate, addMinutes, addMonths } from "../CommonUtil";
import RequiredIcon from "../../components/commons/RequiredIcon";
import ReactHtmlParser from "react-html-parser";

function StudentCourse(props) {
  const [_user_id, setUserId] = useState(props.match.params.id);
  const { register, handleSubmit } = useForm();
  const refBackLink = useRef(null);
  const [student, set_student] = useState({});

  const [isAddNew, setIsAddNew] = useState(true);

  const [pk_course_detail, set_pk_course_detail] = useState("");
  const [course_id, set_course_id] = useState("");
  const [course_name, set_course_name] = useState("");

  const [course_str_date, set_course_str_date] = useState(new Date());
  const [course_end_date, set_course_end_date] = useState(new Date());

  const [duration_month, set_duration_month] = useState(0);
  const [lesson_minutes, set_lesson_minutes] = useState(0);
  const [number_lessons, set_number_lessons] = useState(0);

  const [tuition_fee, set_tuition_fee] = useState("");
  const [tuition_fee_paid, set_tuition_fee_paid] = useState(0);
  const [tuition_fee_unpaid, set_tuition_fee_unpaid] = useState(0);
  const [course_notes, set_course_notes] = useState("");

  //#region Time Start~End
  const [mo_time_str, set_mo_time_str] = useState(null);
  const [mo_time_end, set_mo_time_end] = useState(null);
  const [tu_time_str, set_tu_time_str] = useState(null);
  const [tu_time_end, set_tu_time_end] = useState(null);
  const [we_time_str, set_we_time_str] = useState(null);
  const [we_time_end, set_we_time_end] = useState(null);
  const [th_time_str, set_th_time_str] = useState(null);
  const [th_time_end, set_th_time_end] = useState(null);
  const [fr_time_str, set_fr_time_str] = useState(null);
  const [fr_time_end, set_fr_time_end] = useState(null);
  const [sa_time_str, set_sa_time_str] = useState(null);
  const [sa_time_end, set_sa_time_end] = useState(null);
  const [su_time_str, set_su_time_str] = useState(null);
  const [su_time_end, set_su_time_end] = useState(null);
  //#endregion

  const [course_options, set_course_options] = useState([{}]);
  const [cbx_number_lessons, set_cbx_number_lessons] = useState(0);
  const [cbx_tuition_fee, set_cbx_tuition_fee] = useState(0);
  const [cbx_duration_month, set_cbx_duration_month] = useState(0);
  const [cbx_lesson_minutes, set_cbx_lesson_minutes] = useState(0);

  const handleChangeCourse = (e) => {
    set_course_id(e.target.value);

    const found = course_options.find(
      (course) => course._id === e.target.value
    );
    if (found) {
      //console.log(found);
      if (found._id) {
        set_course_name(found.course_name);
      } else {
        set_course_name("");
      }

      set_tuition_fee(found.tuition_fee);
      set_number_lessons(found.number_lessons);
      set_duration_month(found.duration_month);
      set_lesson_minutes(found.lesson_minutes);
      set_course_notes(found.notes);

      if (course_str_date)
        set_course_end_date(addMonths(course_str_date, found.duration_month));

      set_cbx_number_lessons(found.number_lessons);
      set_cbx_tuition_fee(found.tuition_fee);
      set_cbx_duration_month(found.duration_month);
      set_cbx_lesson_minutes(found.lesson_minutes);
    }
  };

  useEffect(() => {
    AxiosCommon.get(`/courses`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("courses res:", res);
        set_course_options([
          {
            course_name: "Chọn khóa học",
            notes: "",
            duration_month: "",
            number_lessons: 0,
            tuition_fee: 0,
            lesson_minutes: 0,
            _id: "",
          },
          ...res.data,
        ]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      setUserId(props.match.params.id);

      AxiosCommon.get(
        `/user/students/${props.match.params.id}`,
        AxiosCommon.defaults.headers
      )
        .then((res) => {
          console.log("/user/students/: ", res);
          if (res.status === 200) {
            set_student(res.data);

            if (res.data.course_details && res.data.course_details.length > 0) {
              setIsAddNew(false);

              const course_detail = res.data.course_details[0];

              set_pk_course_detail(course_detail._id);
              set_course_id(course_detail.course_id);
              set_course_name(course_detail.course_name);

              set_course_str_date(strToDate(course_detail.course_str_date));
              set_course_end_date(strToDate(course_detail.course_end_date));

              set_duration_month(course_detail.duration_month);
              set_lesson_minutes(course_detail.lesson_minutes);
              set_number_lessons(course_detail.number_lessons);

              set_tuition_fee(course_detail.tuition_fee);
              set_tuition_fee_paid(course_detail.tuition_fee_paid);
              set_tuition_fee_unpaid(course_detail.tuition_fee_unpaid);

              set_mo_time_str(strToDate(course_detail.mo_time_str));
              set_mo_time_end(strToDate(course_detail.mo_time_end));
              set_tu_time_str(strToDate(course_detail.tu_time_str));
              set_tu_time_end(strToDate(course_detail.tu_time_end));
              set_we_time_str(strToDate(course_detail.we_time_str));
              set_we_time_end(strToDate(course_detail.we_time_end));
              set_th_time_str(strToDate(course_detail.th_time_str));
              set_th_time_end(strToDate(course_detail.th_time_end));
              set_fr_time_str(strToDate(course_detail.fr_time_str));
              set_fr_time_end(strToDate(course_detail.fr_time_end));
              set_sa_time_str(strToDate(course_detail.sa_time_str));
              set_sa_time_end(strToDate(course_detail.sa_time_end));
              set_su_time_str(strToDate(course_detail.su_time_str));
              set_su_time_end(strToDate(course_detail.su_time_end));

              set_course_notes(res.data.course_notes);
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props, props.match, props.match.params.id]);

  const onSubmitForm = (data, e) => {
    e.preventDefault();
    console.log("onSubmitForm");
    let temp_set_errors_msg = "";
    if (!course_name) {
      temp_set_errors_msg += "Cần nhập「Khóa học」\n";
    }
    if (course_str_date === null || course_end_date === null) {
      temp_set_errors_msg += "Cần nhập「Ngày học」bắt đầu và kết thúc\n";
    }

    if (temp_set_errors_msg.length > 0) {
      alert(temp_set_errors_msg);
      return;
    }

    let formData = {
      pk_course_detail,
      course_id,
      course_name,
      course_str_date,
      course_end_date,

      duration_month,
      lesson_minutes,
      number_lessons,

      tuition_fee,
      tuition_fee_paid,
      tuition_fee_unpaid,

      mo_time_str,
      mo_time_end,
      tu_time_str,
      tu_time_end,
      we_time_str,
      we_time_end,
      th_time_str,
      th_time_end,
      fr_time_str,
      fr_time_end,
      sa_time_str,
      sa_time_end,
      su_time_str,
      su_time_end,
      course_notes,
    };
    let url = `/user/students/course_detail/${_user_id}`;
    console.log(url);
    AxiosCommon.post(url, formData, AxiosCommon.defaults.headers)
      .then((res) => {
        console.log("update user successfully: ", res);
        if (res.status === 200) {
          refBackLink.current.click();
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    //----------------------
  };

  return (
    <div>
      <h1 className="dashboard__header">
        {isAddNew ? "Thêm khóa học" : "Chỉnh sửa khóa học"}
      </h1>

      <div className="student__course__schedule">
        <StudentCard student={student} />
        <Link
          className="card__link card__link__danger card__link__right"
          to="/admin/teachers"
          target="_blank"
        >
          Chọn giảng viên
        </Link>
      </div>
      <div className="student__course__info">
        {isAddNew && (
          <div>
            <div className="student__edit__contents">
              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="online_class.jpg" alt="" />
                  Khóa học tham khảo
                </div>

                <select
                  name="course_name"
                  label="Chọn khóa học"
                  className="student__input__item"
                  value={course_id}
                  onChange={handleChangeCourse}
                >
                  {course_options.map((item) => (
                    <option
                      key={`student_course_option_${item._id}`}
                      value={item._id}
                    >
                      {item.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="number_lessons.png" alt="" />
                  Số tiết học 1 tuần
                </div>
                <div className="student__field__content">
                  <CurrencyInput
                    name="cbx_number_lessons"
                    value={cbx_number_lessons}
                    precision="0"
                    className="student__input__readonly"
                    disabled
                  />
                </div>
              </div>

              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="tuition_fee.png" alt="" />
                  Học phí tham khảo
                </div>
                <div className="student__field__content">
                  <CurrencyInput
                    name="cbx_tuition_fee"
                    value={cbx_tuition_fee}
                    precision="0"
                    className="student__input__readonly"
                    disabled
                  />
                </div>
              </div>

              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="calendar_time.jpg" alt="" />
                  Thời lượng
                </div>
                <CurrencyInput
                  name="cbx_duration_month"
                  value={cbx_duration_month}
                  precision="0"
                  className="student__input__readonly"
                  disabled
                  suffix=" (tháng)"
                />
              </div>

              <div className="student__field" />

              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="time.png" alt="" />
                  Thời gian 1 buổi học
                </div>
                <CurrencyInput
                  name="lesson_minutes"
                  value={cbx_lesson_minutes}
                  precision="0"
                  className="student__input__readonly"
                  disabled
                  suffix=" (phút)"
                />
              </div>
            </div>

            <hr />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
          <div className="student__edit__contents">
            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="online_class.jpg" alt="" />
                Khóa học
              </div>
              <span>
                <input
                  name="course_name"
                  value={course_name}
                  ref={register({ required: "Cần nhập「Tên khóa học」" })}
                  onChange={(e) => set_course_name(e.target.value)}
                  className="student__input__item"
                  placeholder="Nhập tên khóa học"
                />
                <RequiredIcon />
              </span>
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="calendar_time.jpg" alt="" />
                Thời lượng
              </div>
              <CurrencyInput
                name="duration_month"
                value={duration_month}
                onChange={(mask, data) => set_duration_month(data)}
                precision="0"
                className="student__input__readonly"
                suffix=" (tháng)"
              />
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="tuition_fee.png" alt="Thời gian" />
                Học phí
              </div>

              <div className="student__field__content">
                <CurrencyInput
                  id={`${_user_id}_tuition_fee`}
                  name="tuition_fee"
                  value={tuition_fee}
                  onChange={(data) => set_tuition_fee(data)}
                  precision="0"
                  className="student__input__item"
                />
              </div>
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="number_lessons.png" alt="Parent" />
                Số tiết học 1 tuần
              </div>
              <div className="student__field__content">
                <CurrencyInput
                  name="number_lessons"
                  value={number_lessons}
                  onChange={(mask, data) => set_number_lessons(data)}
                  className="student__input__readonly"
                  precision="0"
                />
              </div>
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="fee_paid.png" alt="tuition_fee_paid" />
                Học phí đã đóng
              </div>
              <div className="student__field__content">
                <CurrencyInput
                  name="tuition_fee_paid"
                  value={tuition_fee_paid}
                  onChange={(data) => {
                    set_tuition_fee_paid(data);

                    const fee = strToFloat(
                      document
                        .getElementById(`${_user_id}_tuition_fee`)
                        .getAttribute("value")
                    );
                    const paid = strToFloat(data);
                    //console.log(fee, paid);

                    set_tuition_fee_unpaid(fee - paid);
                  }}
                  precision="0"
                  className="student__input__item"
                />
              </div>
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="time.png" alt="" />
                Thời gian 1 buổi học
              </div>
              <CurrencyInput
                name="lesson_minutes"
                value={lesson_minutes}
                onChange={(mask, data) => set_lesson_minutes(data)}
                precision="0"
                className="student__input__readonly"
                suffix=" (phút)"
              />
            </div>

            <div className="student__field">
              <div className="student__edit__label">
                <CardIcon icon="fee_unpaid.png" alt="tuition_fee_unpaid" />
                Học phí còn lại
              </div>
              <div className="student__field__content">
                <CurrencyInput
                  name="tuition_fee_unpaid"
                  value={tuition_fee_unpaid}
                  onChange={(data) => set_tuition_fee_unpaid(data)}
                  precision="0"
                  className="student__input__readonly"
                  disabled
                />
              </div>
            </div>

            <div className="student__field">
              <div className="student__edit__label"></div>

              <span className="student__edit__day">
                {" Tổng cộng: "}
                {number_lessons * 4 * duration_month} (tiết học)
              </span>
            </div>
          </div>

          <br />
          <div className="student__edit__header">
            <div className="student__edit__label">
              <CardIcon icon="calendar_time.jpg" alt="Ngày học" />
              Ngày học
            </div>
            <div className="student__field__content">
              {/* https://www.npmjs.com/package/react-datepicker */}

              <DatePicker
                selected={course_str_date}
                onChange={(date) => {
                  set_course_str_date(date);
                  set_course_end_date(addMonths(date, duration_month));
                }}
                peekNextMonth
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                placeholderText="Ngày bắt đầu"
              />
              <SymbolTo />
              <DatePicker
                selected={course_end_date}
                onChange={(date) => set_course_end_date(date)}
                peekNextMonth
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                placeholderText="Ngày kết thúc"
              />
              <RequiredIcon />
            </div>
          </div>

          <div className="student__edit__header">
            <div className="student__edit__label">
              <CardIcon icon="time.png" alt="Thời gian" />
              Thời gian học
            </div>
            <div className="student__edit__courseCalendar">
              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 2</span>
                <DatePicker
                  name="mo_time_str"
                  selected={mo_time_str}
                  onChange={(date) => {
                    set_mo_time_str(date);
                    set_mo_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="mo_time_end"
                  selected={mo_time_end}
                  onChange={(date) => set_mo_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 3</span>
                <DatePicker
                  name="tu_time_str"
                  selected={tu_time_str}
                  onChange={(date) => {
                    set_tu_time_str(date);
                    set_tu_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="tu_time_end"
                  selected={tu_time_end}
                  onChange={(date) => set_tu_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 4</span>
                <DatePicker
                  name="we_time_str"
                  selected={we_time_str}
                  onChange={(date) => {
                    set_we_time_str(date);
                    set_we_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="we_time_end"
                  selected={we_time_end}
                  onChange={(date) => set_we_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 5</span>
                <DatePicker
                  name="th_time_str"
                  selected={th_time_str}
                  onChange={(date) => {
                    set_th_time_str(date);
                    set_th_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="th_time_end"
                  selected={th_time_end}
                  onChange={(date) => set_th_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 6</span>
                <DatePicker
                  name="fr_time_str"
                  selected={fr_time_str}
                  onChange={(date) => {
                    set_fr_time_str(date);
                    set_fr_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="fr_time_end"
                  selected={fr_time_end}
                  onChange={(date) => set_fr_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Thứ 7</span>
                <DatePicker
                  name="sa_time_str"
                  selected={sa_time_str}
                  onChange={(date) => {
                    set_sa_time_str(date);
                    set_sa_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="sa_time_end"
                  selected={sa_time_end}
                  onChange={(date) => set_sa_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              <div className="student__edit__dayofweek">
                <span className="student__edit__day">Chủ nhật</span>
                <DatePicker
                  name="su_time_str"
                  selected={su_time_str}
                  onChange={(date) => {
                    set_su_time_str(date);
                    set_su_time_end(addMinutes(date, lesson_minutes));
                  }}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <SymbolTo />
                <DatePicker
                  name="su_time_end"
                  selected={su_time_end}
                  onChange={(date) => set_su_time_end(date)}
                  className="student__edit__time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>

          <div className="student__field">
            <div className="student__edit__label">
              <CardIcon icon="notes.png" alt="" />
              Nội dung khóa học
            </div>
          </div>

          <div className="student__course__notes">
            {ReactHtmlParser(course_notes)}
          </div>

          {/* controls     */}
          <div className="student__course__buttons">
            <Link
              className="card__link hor__center"
              to="/admin/students"
              ref={refBackLink}
            >
              List
            </Link>

            <input
              name="submit"
              className="card__link card__link__danger"
              type="submit"
              value={isAddNew ? "Create" : "Update"}
            ></input>
          </div>
          {/* end controls */}
        </form>
      </div>
    </div>
  );
}

export default StudentCourse;
