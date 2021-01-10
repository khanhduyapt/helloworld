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

  const refBackLink = useRef(null);
  const [isAddNew, setIsAddNew] = useState(true);

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/undefined"
  );

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

    let temp_set_errors_msg = "";
    if (!fullname) {
      temp_set_errors_msg += "Cần nhập「Họ tên học viên」\n";
    }
    if (!account) {
      temp_set_errors_msg += "Cần nhập「Tài khoản đăng nhập」\n";
    }

    if (temp_set_errors_msg.length > 0) {
      alert(temp_set_errors_msg);
      return;
    }

    AxiosCommon.get(
      `/user/check/${account}/${_id}`,
      AxiosCommon.defaults.headers
    ).then((res) => {
      if (res.status !== 200) {
        console.log(res.data.msg);
      } else {
        handleUpdate(data);
      }
    });
  };

  const handleUpdate = (data) => {
    let formData = new FormData();
    if (data && data.user_image && data.user_image.length > 0) {
      //console.log("upload: ", data.user_image[0]);
      formData.append("student", data.user_image[0]);
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
    formData.append("phone_number", phone_number);

    formData.append("parent_email", parent_email);
    formData.append("parent_name", parent_name);
    formData.append("parent_phone", parent_phone);

    formData.append("skype_id", skype_id);
    formData.append("zoom_id", zoom_id);
    formData.append("user_notes", user_notes);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
          console.log(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    //----------------------
  };

  return (
    <div className="student__edit">
      {isAddNew && <h1 className="dashboard__header">Thêm mới học viên</h1>}
      {!isAddNew && (
        <h1 className="dashboard__header">Chỉnh sửa thông tin học viên</h1>
      )}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="student__edit__form"
      >
        <div className="student__image__chooser">
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
              setImageUrl(AxiosCommon.defaults.baseURL + "/images/undefined");
            }}
          >
            Xóa
          </button>

          <div className="student__error__msg">
            <ul>
              {errors.user_image && <li>・{errors.user_image.message}</li>}
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
              <li> </li>
            </ul>
          </div>

          <div className="student__edit__otherControls card__link__right">
            <Link
              className="card__link card__link__danger card__link__right"
              to="/admin/teachers"
              target="_blank"
            >
              Chọn giảng viên
            </Link>

            <Link className="card__link" to={`/admin/student_course/${_id}`}>
              Thông tin khóa học
            </Link>
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

                {isAddNew && (
                  <div className="student__field">
                    <div className="student__edit__label">
                      <CardIcon icon="birthday.png" alt="birthday" />
                      Mật khẩu đăng nhập
                    </div>
                    <input
                      name="password"
                      type="password"
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
                )}

                {!isAddNew && (
                  <div className="student__field">
                    <div className="student__edit__label">
                      <CardIcon icon="birthday.png" alt="birthday" />
                      Mật khẩu đăng nhập
                    </div>
                    <input
                      name="password"
                      type="password"
                      value={password}
                      ref={register()}
                      onChange={(e) => set_password(e.target.value)}
                      className="student__input__item"
                      placeholder="Mật khẩu đăng nhập"
                    />
                  </div>
                )}
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
                List
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
