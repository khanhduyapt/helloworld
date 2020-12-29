import "./TeacherEdit.css";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { objToStr } from "../CommonUtil";

function TeacherEdit(props) {
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
  const [phone_number, set_phone_number] = useState("");
  const [skype_id, set_skype_id] = useState("");
  const [zoom_id, set_zoom_id] = useState("");
  const [user_notes, set_user_notes] = useState("");

  const refBackLink = useRef(null);
  const [isAddNew, setIsAddNew] = useState(true);

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
  );

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      setIsAddNew(false);

      AxiosCommon.get(`/user/teacher/${_id}`, AxiosCommon.defaults.headers)
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
            set_phone_number(res.data.phone_number);
            set_skype_id(res.data.skype_id);
            set_zoom_id(res.data.zoom_id);
            set_user_notes(objToStr(res.data.user_notes));
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
    if (!password) {
      temp_set_errors_msg += "Cần nhập「Mật khẩu mặc định」\n";
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
    formData.append("skype_id", skype_id);
    formData.append("zoom_id", zoom_id);
    formData.append("user_notes", user_notes);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.sid,
      },
    };

    let url = `/user/teacher/add`;
    if (_id && _id !== "add") {
      url = `/user/teacher/update/${_id}`;
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
    <div className="teacher__edit">
      {isAddNew && <h1 className="dashboard__header">Thêm mới giảng viên</h1>}
      {!isAddNew && (
        <h1 className="dashboard__header">Chỉnh sửa thông tin giảng viên</h1>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="teacher__edit__form"
      >
        <div className="teacher__image__chooser">
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
            className="teacher__image__choosefile"
          />
        </div>
        <div className="teacher__image__chooser">
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

          <div className="teacher__error__msg">
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
          {!isAddNew && (
            <Link
              className="card__link card__link__danger"
              to={`/admin/teacher_schedule/${_id}`}
            >
              Schedule
            </Link>
          )}
        </div>
        <div className="teacher__edit__info">
          <div className="teacher__edit__infoMain">
            <div className="teacher__edit__inputs">
              {/* Họ tên giảng viên */}
              <div className="teacher__edit__contents">
                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="student.png" alt="full name" />
                    Họ tên giảng viên
                  </div>
                  <input
                    name="fullname"
                    value={fullname}
                    ref={register({
                      required: "Cần nhập「Họ tên học viên」",
                    })}
                    onChange={(e) => set_fullname(e.target.value)}
                    className="teacher__input__item"
                    placeholder="Họ và tên"
                  />
                  <RequiredIcon />
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="account.jpg" alt="Tài khoản" />
                    Tài khoản đăng nhập
                  </div>
                  <div className="teacher__field__content">
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
                      className="teacher__input__item"
                      placeholder="Tài khoản đăng nhập"
                    />
                    <RequiredIcon />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="id.png" alt="Mã giảng viên" />
                    Mã giảng viên
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="local_id"
                      value={local_id}
                      onChange={(e) => set_local_id(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Mã giảng viên"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="birthday.png" alt="birthday" />
                    Mật khẩu đăng nhập
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
                    className="teacher__input__item"
                    placeholder="Mật khẩu đăng nhập"
                  />
                  <RequiredIcon />
                </div>
              </div>

              <br />

              <div className="teacher__edit__contents">
                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="facebook.jpg" alt="Facebook" />
                    Facebook
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="facebook"
                      value={facebook}
                      onChange={(e) => set_facebook(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Facebook"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="skype.png" alt="Skype" />
                    Skype
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="skype_id"
                      value={skype_id}
                      onChange={(e) => set_skype_id(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Skype"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="email.png" alt="Email" />
                    Email
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="zoom.png" alt="Zoom" />
                    Zoom
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="zoom_id"
                      value={zoom_id}
                      onChange={(e) => set_zoom_id(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Zoom"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
                    <CardIcon icon="phone_number.png" alt="Phone" />
                    SĐT
                  </div>
                  <div className="teacher__field__content">
                    <input
                      name="phone_number"
                      value={phone_number}
                      onChange={(e) => set_phone_number(e.target.value)}
                      className="teacher__input__item"
                      placeholder="Điện thoại liên hệ"
                    />
                  </div>
                </div>

                <div className="teacheredit__field">
                  <div className="teacher__edit__label">
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
            </div>

            <div className="teacher__field__address">
              <div className="teacher__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Chỗ ở hiện tại
              </div>
              <input
                name="address"
                value={address}
                className="teacher__input__address"
                onChange={(e) => set_address(e.target.value)}
                placeholder="Nhập chỗ ở hiện tại"
              />
            </div>
          </div>
          <div className="teacher__edit__infoOther">
            <br />
            <label className="teacher__edit__label">Giới thiệu bản thân</label>
            <div className="upload__contents__ckeditor">
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder:
                    "Giới thiệu bản thân, thành tích, chứng chỉ đào tạo...",
                }}
                data={user_notes}
                onChange={(e, editor) => set_user_notes(editor.getData())}
              />
            </div>

            <div className="teacher__edit__buttons">
              <Link
                className="card__link hor__center"
                ref={refBackLink}
                to="/admin/teachers"
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

export default TeacherEdit;
