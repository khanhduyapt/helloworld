import "./TeacherSchedule.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker"; //https://reactdatepicker.com/#example-date-range-with-disabled-navigation-shown
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";
import SearchIcon from "../../components/commons/SearchIcon";
import RequiredIcon from "../../components/commons/RequiredIcon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { objToStr, strToDate } from "../CommonUtil";
import Moment from "moment";
import SymbolTo from "../../components/commons/SymbolTo";

function TeacherSchedule(props) {
  const [student_list, set_student_list] = useState([]);

  const [_id, setId] = useState("");

  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
  );

  const [fullname, set_fullname] = useState("");
  const [account, set_account] = useState("");
  const [email, set_email] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [skype_id, set_skype_id] = useState("");
  const [zoom_id, set_zoom_id] = useState("");

  const [search_info, set_search_info] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      AxiosCommon.get(`/user/teacher/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_account(res.data.account);
            set_email(res.data.email);
            set_fullname(res.data.fullname);
            set_phone_number(res.data.phone_number);
            set_skype_id(res.data.skype_id);
            set_zoom_id(res.data.zoom_id);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.match.params.id]);

  const onSubmitSearchForm = (data, e) => {
    e.preventDefault();

    AxiosCommon.post(
      `/user/students/search`,
      { search_info },
      AxiosCommon.defaults.headers
    ).then((res) => {
      console.log(`/user/students/search`, res);

      if (res.status !== 200) {
        alert(res.data.msg);
      } else {
        set_student_list(res.data);
      }
    });
  };

  return (
    <div>
      <div className="teacher__schedule">
        <img className="teacher__schedule__avatar" src={imageUrl} alt=""></img>
        <div className="teacher__inputs">
          <div className="teacher__header">
            <Link className="card__link" to={`/admin/teacher/${_id}`}>
              {fullname}
            </Link>
          </div>

          <div className="teacher__contents">
            <div className="teacher__field">
              <div className="teacher__field__label">
                <CardIcon icon="account.jpg" alt="Tài khoản" />
              </div>
              <div className="teacher__field__content">{account}</div>
            </div>

            <div className="teacher__field">
              <div className="teacher__field__label">
                <CardIcon icon="phone_number.png" alt="Facebook" />
              </div>
              <div className="teacher__field__content">{phone_number}</div>
            </div>

            <div className="teacher__field">
              <div className="teacher__field__label">
                <CardIcon icon="skype.png" alt="Skype" />
              </div>
              <div className="teacher__field__content">{skype_id}</div>
            </div>

            <div className="teacher__field">
              <div className="teacher__field__label">
                <CardIcon icon="email.png" alt="Email" />
              </div>
              <div className="teacher__field__content">{email}</div>
            </div>

            <div className="teacher__field">
              <div className="teacher__field__label">
                <CardIcon icon="zoom.png" alt="Zoom" />
              </div>
              <div className="teacher__field__content">{zoom_id}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="teacher__schedule__get__students">
        <div className="teacher__schedule__search">
          <form
            onSubmit={handleSubmit(onSubmitSearchForm)}
            autoComplete="off"
            className="teacher__schedule__form"
          >
            <input
              name="search_info"
              ref={register}
              value={search_info}
              onChange={(e) => set_search_info(e.target.value)}
              className="teacher__schedule__searchinfo"
              placeholder="Nhập họ tên học viên, tài khoản đăng nhập, hoặc mã học viên..."
            />

            <button name="submit" className="" type="submit">
              <SearchIcon />
            </button>
          </form>

          <div className="teacher__schedule__students">
            {student_list.map((student) => {
              return (
                <div
                  className="search__result"
                  key={student._id}
                  id={`candidate_${student._id}`}
                >
                  <img
                    className="teacher__schedule__avatar"
                    src={
                      AxiosCommon.defaults.baseURL + "/images/" + student.avatar
                    }
                    alt=""
                  ></img>

                  <div className="search__result__studentinfo">
                    <div className="tsched__studentinfo__field">
                      <CardIcon icon="id.png" alt="Mã học viên" />
                      {student.local_id}
                    </div>

                    <div className="tsched__studentinfo__field">
                      <CardIcon icon="account.jpg" alt="Tài khoản" />
                      {student.account}
                    </div>

                    <div className="tsched__studentinfo__field">
                      <CardIcon icon="student.png" alt="full name" />
                      {student.fullname}
                    </div>

                    <div className="tsched__studentinfo__field">
                      <CardIcon icon="phone_number.png" alt="Phone" />
                      {student.phone_number}
                    </div>

                    <div className="tsched__studentinfo__field">
                      <CardIcon icon="email.png" alt="Email" />
                      {student.email}
                    </div>
                  </div>

                  <div className="search__result__studentsched">
                    {student.course_details &&
                      student.course_details.length > 0 && (
                        <div>
                          <div className="search__result__time">
                            <CardIcon icon="online_class.jpg" alt="Khóa học" />
                            {student.course_details[0].course_name}
                            <CardIcon icon="remain.jpg" alt="remain" />
                            {student.course_details[0].lessons_remain}
                          </div>

                          <div className="search__result__time">
                            <CardIcon icon="calendar_time.jpg" alt="Ngày học" />
                            {Moment(
                              student.course_details[0].course_str_date
                            ).format("DD/MM/YYYY")}
                            <SymbolTo />
                            {Moment(
                              student.course_details[0].course_end_date
                            ).format("DD/MM/YYYY")}
                          </div>

                          {strToDate(student.course_details[0].mo_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 2
                              </div>

                              {Moment(
                                student.course_details[0].mo_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].mo_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].tu_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 3
                              </div>

                              {Moment(
                                student.course_details[0].tu_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].tu_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].we_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 4
                              </div>

                              {Moment(
                                student.course_details[0].we_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].we_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].th_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 5
                              </div>

                              {Moment(
                                student.course_details[0].th_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].th_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].fr_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 6
                              </div>

                              {Moment(
                                student.course_details[0].fr_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].fr_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].sa_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Thứ 7
                              </div>

                              {Moment(
                                student.course_details[0].sa_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].sa_time_end
                              ).format("h:mm a")}
                            </div>
                          )}

                          {strToDate(student.course_details[0].su_time_str) && (
                            <div className="search__result__time">
                              <div className="search__result__studenttime">
                                <CardIcon icon="time.png" alt="Thời gian" />
                                Chủ nhật
                              </div>

                              {Moment(
                                student.course_details[0].su_time_str
                              ).format("h:mm a")}
                              <SymbolTo />
                              {Moment(
                                student.course_details[0].su_time_end
                              ).format("h:mm a")}
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  <div className="search__result__studentcontrols">
                    <button
                      type="button"
                      className="card__link"
                      onClick={() => {
                        console.log("Thêm học sinh", student._id);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
            {/* end student_list.map */}
          </div>
        </div>

        <div className="teacher__schedule__responsible">
          <div className="teacher__responsible__header">
            Danh sách học viên
            <Link
              className="card__link margin__left__right__5px"
              to={`/admin/teacher/${_id}`}
            >
              {fullname}
            </Link>
            phụ trách
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherSchedule;
