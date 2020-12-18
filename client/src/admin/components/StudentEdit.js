import "./StudentEdit.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";

function StudentEdit(props) {
  //console.log(props);
  //console.log("UploadImage:",  _id, _filename, _header, _content);
  const refEditItem = useRef(null);
  const { register, handleSubmit, control, errors } = useForm();
  const [imagePath, setImagePath] = useState("");
  const [_id, setId] = useState("");

  const [student, setStudent] = useState({});

  const [callback_link, setCallbackLink] = useState("");
  const refBackLink = useRef(null);

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/" + "avatar_250x250_UserName.jpg"
  );
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.sid,
    },
  };

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    //console.log("UploadImage:",  _id, _callback_link);
    if (_id && _id !== "add") {
      AxiosCommon.get(`/user/students/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          //console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.filename
            );
            // setHeader(res.data.header);
            // setContent(res.data.content);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    setCallbackLink("/user/students");
  }, [props.match.params.id]);

  const handleChangeFile = (e) => {
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
          }
        }
      }
    } catch (error) {}
  };

  const handleDelete = (_id, _header) => {
    //console.log("delete:", _id, _header);

    if (
      window.confirm(`Bạn có muốn xóa học viên?\n${_header}\n${_id}`) === true
    ) {
      //   AxiosCommon.delete(`/upload/${_id}`, AxiosCommon.defaults.headers)
      //     .then((res) => {
      //       console.log("delete:", res);
      //       var elem = document.getElementById("student__edit__form__" + res.data.id);
      //       elem.parentNode.removeChild(elem);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //     });
    }
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    // console.log("upload: ", data);
    let formData = new FormData();
    if (data && data.sliderbar1 && data.sliderbar1.length > 0) {
      //console.log("upload: ", data.sliderbar1[0]);
      formData.append("img", data.sliderbar1[0]);
    }
    formData.append("_id", _id);
    // formData.append("_header", header);
    // formData.append("_content", content);

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
            onChange={handleChangeFile}
            className="student__image__choosefile"
          />
        </div>
        <div className="student__image__chooser">
          <img key={_id} src={imageUrl} alt="Chọn ảnh"></img>

          <button
            type="button"
            className="card__link upload__image__clear"
            onClick={() => {
              //console.log("Xóa");
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
              <div className="student__edit__header">
                <p className="student__field__label">
                  <CardIcon icon="student.png" alt="full name" />
                  Họ tên học viên
                </p>
                <input
                  name="full_name"
                  className="student__input__item"
                  placeholder="Nhập tên của bạn"
                  ref={register({ required: true })}
                />
              </div>
              <div className="student__edit__contents">
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="online_class.jpg" alt="Lớp" /> Lớp
                  </p>
                  <span className="card__link">
                    <input
                      name="course_name"
                      className="student__input__item"
                      placeholder="Tên khóa học"
                      ref={register}
                    />
                  </span>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                    Thời gian
                  </p>
                  <p className="student__field__content">
                    {
                      //https://www.npmjs.com/package/react-datepicker
                    }
                    <Controller
                      control={control}
                      name="start_date"
                      className="student__input__item"
                      ref={register}
                      render={({ onChange, onBlur, value }) => (
                        <ReactDatePicker
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                          placeholderText="start date"
                        />
                      )}
                    />
                    <span style={{ margin: "auto 3px" }}>～</span>
                    <Controller
                      control={control}
                      name="end_date"
                      className="student__input__item"
                      ref={register}
                      render={({ onChange, onBlur, value }) => (
                        <ReactDatePicker
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                          placeholderText="end date"
                        />
                      )}
                    />
                  </p>
                </div>

                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="account.jpg" alt="Tài khoản" />
                    Tài khoản đăng nhập
                  </p>
                  <p className="student__field__content">
                    <input
                      name="account"
                      className="student__input__item"
                      placeholder="Tài khoản đăng nhập"
                      ref={register}
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="facebook.jpg" alt="Facebook" />
                    Facebook
                  </p>
                  <p className="student__field__content">
                    <input
                      name="facebook"
                      className="student__input__item"
                      placeholder="Facebook"
                      ref={register}
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="phone_number.png" alt="Phone" />
                    SĐT
                  </p>
                  <p className="student__field__content">
                    <input
                      name="phone_number"
                      className="student__input__item"
                      placeholder="Điện thoại liên hệ"
                      ref={register}
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="skype.png" alt="Skype" />
                    Skype
                  </p>
                  <p className="student__field__content">
                    <input
                      name="skype_id"
                      className="student__input__item"
                      placeholder="Skype"
                      ref={register}
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="email.png" alt="Email" />
                    Email
                  </p>
                  <p className="student__field__content">
                    <input
                      name="email"
                      className="student__input__item"
                      placeholder="Email"
                      ref={register}
                    />
                  </p>
                </div>
                <div className="student__field__content">
                  <p className="student__field__label">
                    <CardIcon icon="zoom.png" alt="Zoom" />
                    Zoom
                  </p>
                  <p className="student__field__content">
                    <input
                      name="zoom_id"
                      className="student__input__item"
                      placeholder="Zoom"
                      ref={register}
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
              placeholder="Tin nhắn chi tiết. &#10;Thời gian chích hợp để liên hệ với bạn."
            />

            <div className="student__edit__buttons">
              <Link
                className="card__link hor__center"
                ref={refEditItem}
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
