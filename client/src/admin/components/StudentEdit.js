import "./StudentEdit.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker"; //https://reactdatepicker.com/#example-date-range-with-disabled-navigation-shown
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";
import SymbolTo from "../../components/commons/SymbolTo";
import CurrencyInput from "react-currency-input";
import { stringCurruncyToFloat, stringToDate } from "../CommonUtil";
import RequiredIcon from "../../components/commons/RequiredIcon";

function StudentEdit(props) {
  //console.log(props);

  const { register, handleSubmit, errors } = useForm();
  const [imagePath, setImagePath] = useState("");
  const [_id, setId] = useState("");

  const [account, set_account] = useState("");
  const [password, set_password] = useState("");
  const [address, set_address] = useState("");
  const [avatar, set_avatar] = useState("");
  const [date_join, set_date_join] = useState("");
  const [date_of_birth, set_date_of_birth] = useState(new Date());
  const [email, set_email] = useState("");
  const [facebook, set_facebook] = useState("");
  const [fullname, set_fullname] = useState("");
  const [local_id, set_local_id] = useState("");
  const [parent_email, set_parent_email] = useState("");
  const [parent_name, set_parent_name] = useState("");
  const [parent_phone, set_parent_phone] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [skype_id, set_skype_id] = useState("");
  const [zoom_id, set_zoom_id] = useState("");
  const [user_notes, set_user_notes] = useState("");
  const [course_notes, set_course_notes] = useState("");

  const [pk_course_detail, set_pk_course_detail] = useState("");
  const [course_id, set_course_id] = useState("");
  const [course_name, set_course_name] = useState("");
  const [course_str_date, set_course_str_date] = useState(null);
  const [course_end_date, set_course_end_date] = useState(null);
  const [duration_month, set_duration_month] = useState("");
  const [number_lessons, set_number_lessons] = useState(0);
  const [lessons_remain, set_lessons_remain] = useState("");
  const [tuition_fee, set_tuition_fee] = useState("");
  const [tuition_fee_paid, set_tuition_fee_paid] = useState(0);
  const [tuition_fee_unpaid, set_tuition_fee_unpaid] = useState(0);

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
  const [cbx_number_lessons, set_cbx_number_lessons] = useState("");
  const [cbx_tuition_fee, set_cbx_tuition_fee] = useState("");
  const [cbx_course_notes, set_cbx_course_notes] = useState("");

  const refBackLink = useRef(null);
  const [isAddNew, setIsAddNew] = useState(true);
  const [errors_msg, set_errors_msg] = useState([]);

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
  );

  useEffect(() => {
    AxiosCommon.get(`/courses`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("courses res:", res);
        set_course_options([
          {
            course_name: "Chọn khóa học",
            notes: "",
            number_lessons: 0,
            tuition_fee: 0,
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
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      setIsAddNew(false);

      AxiosCommon.get(`/user/students/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_account(res.data.account);
            set_password(res.data.password);
            set_address(res.data.address);
            set_avatar(res.data.avatar);
            set_date_join(res.data.date_join);
            set_date_of_birth(new Date(res.data.date_of_birth));
            set_email(res.data.email);
            set_facebook(res.data.facebook);
            set_fullname(res.data.fullname);
            set_local_id(res.data.local_id);
            set_parent_email(res.data.parent_email);
            set_parent_name(res.data.parent_name);
            set_parent_phone(res.data.parent_phone);
            set_phone_number(res.data.phone_number);
            set_skype_id(res.data.skype_id);
            set_zoom_id(res.data.zoom_id);
            set_user_notes(res.data.user_notes);

            if (res.data.course_details && res.data.course_details.length > 0) {
              const course_detail = res.data.course_details[0];

              set_pk_course_detail(course_detail._id);
              set_course_id(course_detail.course_id);
              set_course_name(course_detail.course_name);

              set_course_str_date(stringToDate(course_detail.course_str_date));
              set_course_end_date(stringToDate(course_detail.course_end_date));

              set_duration_month(course_detail.duration_month);
              set_number_lessons(course_detail.number_lessons);
              set_lessons_remain(course_detail.lessons_remain);
              set_tuition_fee(course_detail.tuition_fee);
              set_tuition_fee_paid(course_detail.tuition_fee_paid);
              set_tuition_fee_unpaid(course_detail.tuition_fee_unpaid);

              set_mo_time_str(stringToDate(course_detail.mo_time_str));
              set_mo_time_end(stringToDate(course_detail.mo_time_end));
              set_tu_time_str(stringToDate(course_detail.tu_time_str));
              set_tu_time_end(stringToDate(course_detail.tu_time_end));
              set_we_time_str(stringToDate(course_detail.we_time_str));
              set_we_time_end(stringToDate(course_detail.we_time_end));
              set_th_time_str(stringToDate(course_detail.th_time_str));
              set_th_time_end(stringToDate(course_detail.th_time_end));
              set_fr_time_str(stringToDate(course_detail.fr_time_str));
              set_fr_time_end(stringToDate(course_detail.fr_time_end));
              set_sa_time_str(stringToDate(course_detail.sa_time_str));
              set_sa_time_end(stringToDate(course_detail.sa_time_end));
              set_su_time_str(stringToDate(course_detail.su_time_str));
              set_su_time_end(stringToDate(course_detail.su_time_end));

              set_course_notes(res.data.course_notes);
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.match.params.id]);

  const handleChangeImage = (e) => {
    try {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        if (file.size > 5000000) Alert("File size cannot exceed more than 5Mb");
        else {
          console.log("File:", e.target.value);
          setImagePath(e.target.value);

          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result);
          };

          if (file) {
            reader.readAsDataURL(file);
            setImageUrl(reader.result);

            set_avatar(file.name);
          }
        }
      }
    } catch (error) {}
  };

  const handleChangeCourse = (e) => {
    set_course_id(e.target.value);
    const found = course_options.find(
      (course) => course._id === e.target.value
    );
    if (found) {
      set_course_name(found.course_name);
      set_tuition_fee(found.tuition_fee);
      set_lessons_remain(found.number_lessons);

      set_cbx_number_lessons(found.number_lessons);
      set_cbx_tuition_fee(found.tuition_fee);
      set_cbx_course_notes(found.notes);
    }
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    let temp_set_errors_msg = [];
    if (!fullname) {
      temp_set_errors_msg.push("Cần nhập「Họ tên học viên」");
    }
    if (!account) {
      temp_set_errors_msg.push("Cần nhập「Tài khoản đăng nhập」");
    }
    if (!password) {
      temp_set_errors_msg.push("Cần nhập「Mật khẩu mặc định」");
    }
    if (!course_name) {
      temp_set_errors_msg.push("Cần nhập「Tên khóa học」");
    }
    if (!course_str_date) {
      temp_set_errors_msg.push("Cần nhập「Ngày bắt đầu」của khóa học.");
    }
    if (!course_end_date) {
      temp_set_errors_msg.push("Cần nhập「Ngày kết thúc」của khóa học.");
    }
    if (temp_set_errors_msg.length > 0) {
      set_errors_msg(temp_set_errors_msg);
      console.log("errors_msg", errors_msg);
      return;
    }

    // console.log("upload: ", data);
    let formData = new FormData();
    if (data && data.user_image && data.user_image.length > 0) {
      //console.log("upload: ", data.user_image[0]);
      formData.append("img", data.user_image[0]);
    }
    formData.append("_id", _id);
    formData.append("account", account);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("avatar", avatar);
    formData.append("date_join", date_join);
    formData.append("date_of_birth", date_of_birth);
    formData.append("email", email);
    formData.append("facebook", facebook);
    formData.append("fullname", fullname);
    formData.append("local_id", local_id);
    formData.append("parent_email", parent_email);
    formData.append("parent_name", parent_name);
    formData.append("parent_phone", parent_phone);
    formData.append("phone_number", phone_number);
    formData.append("skype_id", skype_id);
    formData.append("zoom_id", zoom_id);
    formData.append("user_notes", user_notes);

    formData.append("pk_course_detail", pk_course_detail);
    formData.append("course_id", course_id);
    formData.append("course_name", course_name);
    formData.append("course_str_date", course_str_date);
    formData.append("course_end_date", course_end_date);

    formData.append("duration_month", duration_month);
    formData.append("number_lessons", number_lessons);
    formData.append("lessons_remain", lessons_remain);
    formData.append("tuition_fee", tuition_fee);
    formData.append("tuition_fee_paid", tuition_fee_paid);
    formData.append("tuition_fee_unpaid", tuition_fee_unpaid);

    formData.append("mo_time_str", mo_time_str);
    formData.append("mo_time_end", mo_time_end);
    formData.append("tu_time_str", tu_time_str);
    formData.append("tu_time_end", tu_time_end);
    formData.append("we_time_str", we_time_str);
    formData.append("we_time_end", we_time_end);
    formData.append("th_time_str", th_time_str);
    formData.append("th_time_end", th_time_end);
    formData.append("fr_time_str", fr_time_str);
    formData.append("fr_time_end", fr_time_end);
    formData.append("sa_time_str", sa_time_str);
    formData.append("sa_time_end", sa_time_end);
    formData.append("su_time_str", su_time_str);
    formData.append("su_time_end", su_time_end);
    formData.append("course_notes", course_notes);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.sid,
      },
    };

    let url = `/user/students/add`;
    if (_id && _id !== "add") {
      url = `/user/students/update/${_id}`;
    }
    AxiosCommon.post(url, formData, config)
      .then((res) => {
        //console.log("update user successfully: ", res);
        if (res.status === 200) {
          refBackLink.current.click();
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="student__edit">
      <h1 className="dashboard__header">Thông tin học viên</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="student__edit__form"
      >
        <div className="student__image__chooser">
          {errors.user_image && (
            <h1 style={{ color: "red" }}>{errors.user_image.message}</h1>
          )}

          <input
            name="user_image"
            value={imagePath}
            onChange={handleChangeImage}
            ref={register}
            type="file"
            accept="image/*"
            className="student__image__choosefile"
          />
        </div>
        <div className="student__image__chooser">
          <img key={_id} src={imageUrl} alt="Chọn ảnh"></img>

          <button
            type="button"
            className="card__link upload__image__clear"
            onClick={() => {
              console.log("Xóa");
              setImagePath("");
              setImageUrl(AxiosCommon.defaults.baseURL + "/images/noimage.jpg");
            }}
          >
            Xóa
          </button>

          <div className="student__error__msg">
            <ul>
              {errors.fullname && <li>・{errors.fullname.message}</li>}
              {errors.account && <li>・{errors.account.message}</li>}
              {errors.password && <li>・{errors.password.message}</li>}
              {errors.course_name && <li>・{errors.course_name.message}</li>}
              {errors.course_str_date && (
                <li>・{errors.course_str_date.message}</li>
              )}
              {errors.course_end_date && (
                <li>・{errors.course_end_date.message}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="student__edit__info">
          <div className="student__edit__infoMain">
            <div className="student__edit__inputs">
              {/* Họ tên học viên */}
              <div className="student__edit__contents">
                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="student.png" alt="full name" />
                    Họ tên học viên
                  </div>
                  <input
                    name="fullname"
                    value={fullname}
                    ref={register({
                      required: "Cần nhập「Họ tên học viên」",
                    })}
                    onChange={(e) => set_fullname(e.target.value)}
                    className="student__input__item"
                    placeholder="Họ và tên"
                  />
                  <RequiredIcon />
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="account.jpg" alt="Tài khoản" />
                    Tài khoản đăng nhập
                  </div>
                  <div className="student__field__content">
                    <input
                      name="account"
                      value={account}
                      ref={register({
                        required: "Cần nhập「Tài khoản đăng nhập」",
                        minLength: {
                          value: 6,
                          message:
                            "「Tài khoản đăng nhập」cần có ít nhất 6 ký tự.",
                        },
                      })}
                      onChange={(e) => set_account(e.target.value)}
                      className="student__input__item"
                      placeholder="Tài khoản đăng nhập"
                    />
                    <RequiredIcon />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="id.png" alt="Mã học viên" />
                    Mã học viên
                  </div>
                  <div className="student__field__content">
                    <input
                      name="local_id"
                      value={local_id}
                      onChange={(e) => set_local_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Mã học viên"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="birthday.png" alt="birthday" />
                    Mật khẩu mặc định
                  </div>
                  <input
                    name="password"
                    value={password}
                    ref={register({
                      required: "Cần nhập「Mật khẩu mặc định」",
                      minLength: {
                        value: 6,
                        message: "Password cần có ít nhất 6 ký tự.",
                      },
                    })}
                    onChange={(e) => set_password(e.target.value)}
                    className="student__input__item"
                    placeholder="Mật khẩu đăng nhập"
                  />
                  <RequiredIcon />
                </div>
              </div>
              <hr />
              {isAddNew && (
                <div>
                  <div className="student__edit__contents">
                    <div className="student__field">
                      <div className="student__edit__label">
                        <CardIcon icon="online_class.jpg" alt="Khóa học" />
                        Khóa học
                      </div>

                      <select
                        name="course_name"
                        label="Chọn khóa học"
                        className="student__input__item"
                        value={course_id}
                        onChange={handleChangeCourse}
                      >
                        {course_options.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.course_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="student__field">
                      <div className="student__edit__label">
                        <CardIcon icon="number_lessons.png" alt="Khóa học" />
                        Số tiết học
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
                        <CardIcon icon="tuition_fee.png" alt="Khóa học" />
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
                  </div>
                  <div className="student__field">
                    <div className="student__edit__label">
                      <CardIcon icon="notes.png" alt="Khóa học" />
                      Chú thích khóa học
                    </div>
                    <input
                      name="cbx_course_notes"
                      value={cbx_course_notes}
                      className="student__input__courseNotes"
                      disabled
                    />
                  </div>
                  <br />
                </div>
              )}

              <div className="student__edit__contents">
                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="online_class.jpg" alt="Khóa học" />
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

                <div className="student__field"></div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="tuition_fee.png" alt="Thời gian" />
                    Học phí
                  </div>

                  <div className="student__field__content">
                    <CurrencyInput
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
                    Số tiết học
                  </div>
                  <div className="student__field__content">
                    <CurrencyInput
                      name="number_lessons"
                      value={number_lessons}
                      onChange={(e) => set_number_lessons(e.target.value)}
                      className="student__input__readonly"
                      precision="0"
                      disabled
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
                        set_tuition_fee_unpaid(
                          stringCurruncyToFloat(tuition_fee) -
                            stringCurruncyToFloat(data)
                        );
                      }}
                      precision="0"
                      className="student__input__item"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="remain.jpg" alt="Parent" />
                    Số tiết học còn lại
                  </div>
                  <div className="student__field__content">
                    <CurrencyInput
                      name="lessons_remain"
                      value={lessons_remain}
                      onChange={(e) => set_lessons_remain(e.target.value)}
                      className="student__input__readonly"
                      precision="0"
                      disabled
                    />
                  </div>
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
              </div>

              <br />
              <div className="student__edit__header">
                <div className="student__edit__label">
                  <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                  Ngày học
                </div>
                <div className="student__field__content">
                  {/* https://www.npmjs.com/package/react-datepicker */}

                  <DatePicker
                    selected={course_str_date}
                    onChange={(date) => set_course_str_date(date)}
                    peekNextMonth
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Ngày bắt đầu"
                  />
                  <input
                    name="course_str_date"
                    value={course_str_date}
                    ref={register({
                      required: "Cần nhập「Ngày bắt đầu」của khóa học.",
                    })}
                    className="student__edit__hidden"
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
                  <input
                    name="course_end_date"
                    value={course_end_date}
                    ref={register({
                      required: "Cần nhập「Ngày kết thúc」của khóa học.",
                    })}
                    className="student__edit__hidden"
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
                      onChange={(date) => set_mo_time_str(date)}
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
                      onChange={(date) => set_tu_time_str(date)}
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
                      onChange={(date) => set_we_time_str(date)}
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
                      onChange={(date) => set_th_time_str(date)}
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
                      onChange={(date) => set_fr_time_str(date)}
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
                      onChange={(date) => set_sa_time_str(date)}
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
                      onChange={(date) => set_su_time_str(date)}
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

              <hr />

              <div className="student__edit__contents">
                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    Họ tên phụ huynh
                  </div>
                  <div className="student__field__content">
                    <input
                      name="parent_name"
                      value={parent_name}
                      onChange={(e) => set_parent_name(e.target.value)}
                      className="student__input__item"
                      placeholder="Họ tên phụ huynh"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    SĐT
                  </div>
                  <div className="student__field__content">
                    <input
                      name="parent_phone"
                      value={parent_phone}
                      onChange={(e) => set_parent_phone(e.target.value)}
                      className="student__input__item"
                      placeholder="SĐT phụ huynh"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    Email
                  </div>
                  <div className="student__field__content">
                    <input
                      name="parent_email"
                      value={parent_email}
                      onChange={(e) => set_parent_email(e.target.value)}
                      className="student__input__item"
                      placeholder="Email phụ huynh"
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="student__edit__contents">
                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="facebook.jpg" alt="Facebook" />
                    Facebook
                  </div>
                  <div className="student__field__content">
                    <input
                      name="facebook"
                      value={facebook}
                      onChange={(e) => set_facebook(e.target.value)}
                      className="student__input__item"
                      placeholder="Facebook"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="skype.png" alt="Skype" />
                    Skype
                  </div>
                  <div className="student__field__content">
                    <input
                      name="skype_id"
                      value={skype_id}
                      onChange={(e) => set_skype_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Skype"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="email.png" alt="Email" />
                    Email
                  </div>
                  <div className="student__field__content">
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                      className="student__input__item"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="zoom.png" alt="Zoom" />
                    Zoom
                  </div>
                  <div className="student__field__content">
                    <input
                      name="zoom_id"
                      value={zoom_id}
                      onChange={(e) => set_zoom_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Zoom"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="phone_number.png" alt="Phone" />
                    SĐT
                  </div>
                  <div className="student__field__content">
                    <input
                      name="phone_number"
                      value={phone_number}
                      onChange={(e) => set_phone_number(e.target.value)}
                      className="student__input__item"
                      placeholder="Điện thoại liên hệ"
                    />
                  </div>
                </div>

                <div className="student__field">
                  <div className="student__edit__label">
                    <CardIcon icon="birthday.png" alt="birthday" />
                    Ngày sinh
                  </div>
                  <DatePicker
                    name="date_of_birth"
                    selected={date_of_birth}
                    onChange={(date) => set_date_of_birth(date)}
                    peekNextMonth
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>

              <div className="student__field">
                <div className="student__edit__label">
                  <CardIcon icon="address.png" alt="full name" />
                  Chỗ ở hiện tại
                </div>
                <input
                  name="address"
                  value={address}
                  className="student__input__address"
                  onChange={(e) => set_address(e.target.value)}
                  placeholder="Nhập chỗ ở hiện tại"
                />
              </div>
            </div>
          </div>
          <div className="student__edit__infoOther">
            <textarea
              name="user_notes"
              value={user_notes}
              onChange={(e) => set_user_notes(e.target.value)}
              rows="5"
              placeholder="Thông tin chi tiết. &#10;Ghi chú, nhận xét, đánh giá khác."
            />

            <div className="student__edit__buttons">
              <Link
                className="card__link hor__center"
                ref={refBackLink}
                to="/admin/students"
              >
                Back
              </Link>

              <input
                name="submit"
                className="card__link card__link__danger"
                type="submit"
                value={isAddNew ? "Create" : "Update"}
              ></input>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentEdit;
