import "./StudentEdit.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
//https://reactdatepicker.com/#example-date-range-with-disabled-navigation-shown
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";
import SymbolTo from "../../components/commons/SymbolTo";

function StudentEdit(props) {
  //console.log(props);

  const { register, handleSubmit, errors } = useForm();
  const [imagePath, setImagePath] = useState("");
  const [_id, setId] = useState("");

  const [account, set_account] = useState("");
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

  const [course_name, set_course_name] = useState("");
  const [course_str_date, set_course_str_date] = useState(new Date());
  const [course_end_date, set_course_end_date] = useState(new Date());

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

  const refBackLink = useRef(null);

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
  );

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    console.log("UploadImage:", _id);
    if (_id && _id !== "add") {
      AxiosCommon.get(`/user/students/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_account(res.data.account);
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

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    // console.log("upload: ", data);
    let formData = new FormData();
    if (data && data.user_image && data.user_image.length > 0) {
      console.log("upload: ", data.user_image[0]);
      formData.append("img", data.user_image[0]);
    }
    formData.append("_id", _id);
    formData.append("account", account);
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

    formData.append("course_name", course_name);
    formData.append("course_str_date", course_str_date);
    formData.append("course_end_date", course_end_date);

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

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.sid,
      },
    };

    AxiosCommon.post(`/user/update/${_id}`, formData, config)
      .then((res) => {
        console.log("update user successfully: ", res);
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
            ref={register}
            type="file"
            accept="image/*"
            name="user_image"
            value={imagePath}
            onChange={handleChangeImage}
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
        </div>
        <div className="student__edit__info">
          <div className="student__edit__infoMain">
            <div className="student__edit__inputs">
              <div className="student__edit__contents">
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="student.png" alt="full name" />
                    Họ tên học viên
                  </p>
                  <input
                    name="fullname"
                    value={fullname}
                    onChange={(e) => set_fullname(e.target.value)}
                    className="student__input__item"
                    placeholder="Họ và tên"
                    ref={register({ required: true })}
                  />
                </div>

                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="id.png" alt="Mã học viên" />
                    Mã học viên
                  </p>
                  <p className="student__field__content">
                    <input
                      name="local_id"
                      value={local_id}
                      onChange={(e) => set_local_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Mã học viên"
                    />
                  </p>
                </div>
              </div>

              <hr />

              <div className="student__edit__header">
                <p className="student__edit__label">
                  <CardIcon icon="online_class.jpg" alt="Lớp" /> Lớp
                </p>
                <span className="card__link">
                  <input
                    name="course_name"
                    value={course_name}
                    onChange={(e) => set_course_name(e.target.value)}
                    className="student__input__item"
                    placeholder="Tên khóa học"
                  />
                </span>
              </div>
              <div className="student__edit__header">
                <p className="student__edit__label">
                  <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                  Ngày bắt đầu ~ kết thúc
                </p>
                <p className="student__field__content">
                  {/* https://www.npmjs.com/package/react-datepicker */}

                  <DatePicker
                    name="course_str_date"
                    className="student__input__item student__edit__time"
                    selected={course_str_date}
                    onChange={(date) => set_course_str_date(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                  <SymbolTo />
                  <DatePicker
                    name="course_end_date"
                    className="student__input__item student__edit__time"
                    selected={course_end_date}
                    onChange={(date) => set_course_end_date(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </p>
              </div>

              <div className="student__edit__header">
                <p className="student__edit__label">
                  <CardIcon icon="time.png" alt="Thời gian" />
                  Thời gian học
                </p>
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
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    Họ tên phụ huynh
                  </p>
                  <p className="student__field__content">
                    <input
                      name="parent_name"
                      value={parent_name}
                      onChange={(e) => set_parent_name(e.target.value)}
                      className="student__input__item"
                      placeholder="Họ tên phụ huynh"
                    />
                  </p>
                </div>

                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    <CardIcon icon="phone_number.png" alt="Parent" />
                    SĐT
                  </p>
                  <p className="student__field__content">
                    <input
                      name="parent_phone"
                      value={parent_phone}
                      onChange={(e) => set_parent_phone(e.target.value)}
                      className="student__input__item"
                      placeholder="SĐT phụ huynh"
                    />
                  </p>
                </div>

                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="parent.png" alt="Parent" />
                    <CardIcon icon="email.png" alt="Parent" />
                    Email
                  </p>
                  <p className="student__field__content">
                    <input
                      name="parent_email"
                      value={parent_email}
                      onChange={(e) => set_parent_email(e.target.value)}
                      className="student__input__item"
                      placeholder="Email phụ huynh"
                    />
                  </p>
                </div>
              </div>

              <div className="student__edit__header">
                <p className="student__edit__label">
                  <CardIcon icon="address.png" alt="full name" />
                  Chỗ ở hiện tại
                </p>
                <input
                  name="address"
                  value={address}
                  className="student__input__address"
                  onChange={(e) => set_address(e.target.value)}
                  placeholder="Nhập chỗ ở hiện tại"
                />
              </div>

              <hr />
              <div className="student__edit__contents">
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="account.jpg" alt="Tài khoản" />
                    Tài khoản đăng nhập
                  </p>
                  <p className="student__field__content">
                    <input
                      name="account"
                      value={account}
                      onChange={(e) => set_account(e.target.value)}
                      className="student__input__item"
                      placeholder="Tài khoản đăng nhập"
                    />
                  </p>
                </div>

                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="phone_number.png" alt="Phone" />
                    SĐT
                  </p>
                  <p className="student__field__content">
                    <input
                      name="phone_number"
                      value={phone_number}
                      onChange={(e) => set_phone_number(e.target.value)}
                      className="student__input__item"
                      placeholder="Điện thoại liên hệ"
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="birthday.png" alt="birthday" />
                    Ngày sinh
                  </p>
                  {/* <CustomDatePicker
                    selected={date_of_birth}
                    onChange={(date) => set_date_of_birth(date)}
                  /> */}

                  <DatePicker
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
              <br />
              <div className="student__edit__contents">
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="facebook.jpg" alt="Facebook" />
                    Facebook
                  </p>
                  <p className="student__field__content">
                    <input
                      name="facebook"
                      value={facebook}
                      onChange={(e) => set_facebook(e.target.value)}
                      className="student__input__item"
                      placeholder="Facebook"
                    />
                  </p>
                </div>

                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="skype.png" alt="Skype" />
                    Skype
                  </p>
                  <p className="student__field__content">
                    <input
                      name="skype_id"
                      value={skype_id}
                      onChange={(e) => set_skype_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Skype"
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="email.png" alt="Email" />
                    Email
                  </p>
                  <p className="student__field__content">
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                      className="student__input__item"
                      placeholder="Email"
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__edit__label">
                    <CardIcon icon="zoom.png" alt="Zoom" />
                    Zoom
                  </p>
                  <p className="student__field__content">
                    <input
                      name="zoom_id"
                      value={zoom_id}
                      onChange={(e) => set_zoom_id(e.target.value)}
                      className="student__input__item"
                      placeholder="Zoom"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="student__edit__infoOther">
            <textarea
              name="student_notes"
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
                className="card__link card__link__danger"
                type="submit"
                value="Update"
              ></input>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentEdit;
