import "./YoutubeEdit.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";
import RequiredIcon from "../../components/commons/RequiredIcon";
import CurrencyInput from "react-currency-input";

function YoutubeEdit(props) {
  //console.log(props);
  //console.log("UploadImage:", _category, _id, _filename, _header, _content);
  const { register, handleSubmit, errors } = useForm();
  const [imagePath, setImagePath] = useState("");
  const [_id, setId] = useState("");

  const [youtube_name, set_youtube_name] = useState("");
  const [duration_month, set_duration_month] = useState(0);
  const [number_lessons, set_number_lessons] = useState(0);
  const [lesson_minutes, set_lesson_minutes] = useState(45);
  const [tuition_fee, set_tuition_fee] = useState("");
  const [notes, set_notes] = useState("");

  const [isAddNew, setIsAddNew] = useState(true);
  const refBackLink = useRef(null);

  const [imageUrl, setImageUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/undefined"
  );

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      setIsAddNew(false);

      AxiosCommon.get(`/youtube/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_youtube_name(res.data.youtube_name);
            set_duration_month(res.data.duration_month);
            set_number_lessons(res.data.number_lessons);
            set_lesson_minutes(res.data.lesson_minutes);
            set_tuition_fee(res.data.tuition_fee);
            set_notes(res.data.notes);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.match.params.id]);

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let formData = new FormData();
    if (data && data.user_image && data.user_image.length > 0) {
      //console.log("upload: ", data.user_image[0]);
      formData.append("img", data.user_image[0]);
    }
    formData.append("_id", _id);
    formData.append("youtube_name", youtube_name);
    formData.append("duration_month", duration_month);
    formData.append("number_lessons", number_lessons);
    formData.append("lesson_minutes", lesson_minutes);
    formData.append("tuition_fee", tuition_fee);
    formData.append("notes", notes);

    let url = "/youtubes/add";
    if (!isAddNew) url = `/youtubes/update/${_id}`;

    console.log(url);

    AxiosCommon.post(url, formData, config)
      .then((res) => {
        console.log("upload successfully: ", res);
        if (res.status === 200) {
          refBackLink.current.click();
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="youtube__edit">
      <h1 className="dashboard__header">
        {isAddNew ? "Thêm khóa học" : "Sửa thông tin khóa học"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="youtube__edit__form"
      >
        <div className="youtube__edit__chooser">
          <input
            ref={register}
            type="file"
            accept="image/*"
            name="user_image"
            value={imagePath}
            className="youtube__edit__choosefile"
          />
        </div>

        <div className="youtube__edit__chooser">
          <img key={_id} src={imageUrl} alt=""></img>

          <button
            type="button"
            className="card__link youtube__edit__clear"
            onClick={() => {
              //console.log("Xóa");
              setImagePath("");
              setImageUrl(AxiosCommon.defaults.baseURL + "/images/undefined");
            }}
          >
            Xóa
          </button>

          <div className="card__link__right youtube__edit__error__msg">
            <ul>
              {errors.youtube_name && <li>・{errors.youtube_name.message}</li>}
              {errors.tuition_fee && <li>・{errors.tuition_fee.message}</li>}
              <li> </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="youtube__edit__contents">
          <div className="youtube__edit__field">
            <label className="youtube__edit__label">
              <CardIcon icon="online_class.jpg" alt="Khóa học" />
              Khóa học
            </label>

            <input
              ref={register({ required: "Cần nhập「Tên khóa học」" })}
              name="youtube_name"
              value={youtube_name}
              onChange={(e) => set_youtube_name(e.target.value)}
              className="youtube__edit__input youtube__edit__fullwidth"
              placeholder="Nhập tên khóa học"
            />
            <RequiredIcon />
          </div>
          <div className="youtube__edit__field">
            <label className="youtube__edit__label">
              <CardIcon icon="tuition_fee.png" alt="Thời gian" />
              Học phí
            </label>
            <CurrencyInput
              name="tuition_fee"
              value={tuition_fee}
              onChange={(data) => set_tuition_fee(data)}
              className="youtube__edit__input"
              precision="0"
            />
            <span className="youtube__edit__span">(vnđ)</span>
            <RequiredIcon />
          </div>

          <div className="youtube__edit__field">
            <label className="youtube__edit__label">
              <CardIcon icon="calendar_time.jpg" alt="Parent" />
              Thời lượng
            </label>
            <CurrencyInput
              name="duration_month"
              value={duration_month}
              onChange={(str, num) => set_duration_month(num)}
              className="youtube__edit__input"
              precision="0"
              suffix=" (tháng)"
            />
          </div>

          <div className="youtube__edit__field">
            <label className="youtube__edit__label">
              <CardIcon icon="number_lessons.png" alt="Parent" />
              Số tiết học 1 tuần
            </label>
            <CurrencyInput
              name="number_lessons"
              value={number_lessons}
              onChange={(data) => set_number_lessons(data)}
              className="youtube__edit__input"
              precision="0"
            />

            <label className="youtube__edit__span">
              <CardIcon icon="calc.jpg" alt="" />
              {number_lessons} buổi x 4 tuần x {duration_month} tháng ={" "}
              {number_lessons * 4 * duration_month} (buổi)
            </label>
          </div>

          <div className="youtube__edit__field">
            <label className="youtube__edit__label">
              <CardIcon icon="time.png" alt="" />
              Thời gian 1 buổi học
            </label>
            <CurrencyInput
              name="lesson_minutes"
              value={lesson_minutes}
              onChange={(str, num) => set_lesson_minutes(num)}
              className="youtube__edit__input"
              precision="0"
              suffix=" (phút)"
            />
          </div>

          <br />
          <label className="youtube__edit__label">Nội dung khóa học:</label>
          <div className="youtube__edit__ckeditor">
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "Nội dung khóa học.",
              }}
              data={notes}
              onChange={(e, editor) => set_notes(editor.getData())}
            />
          </div>
        </div>

        <div className="youtube__edit__buttons">
          <Link
            ref={refBackLink}
            className="card__link hor__center"
            to="/admin/youtubes"
          >
            List
          </Link>

          <input
            className="youtube__edit__submit card__link card__link__danger"
            type="submit"
            value="Upload"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default YoutubeEdit;
