import "./UploadImage.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Alert } from "bootstrap";

function UploadImage(props) {
  //console.log(props);
  //console.log("UploadImage:", _category, _id, _filename, _header, _content);
  const { register, handleSubmit, errors } = useForm();
  const [imagePath, setImagePath] = useState("");
  const [_id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [callback_link, setCallbackLink] = useState("");
  const refBackLink = useRef(null);

  const [imageUrl, setImageUrl] = useState("");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.sid,
    },
  };

  useEffect(() => {
    const _id = props.match.params.id;
    const _category = props.location.category;
    setId(_id);
    setCategory(_category);
    //console.log("UploadImage:", _category, _id, _callback_link);
    if (_id && _id !== "add") {
      AxiosCommon.get(`/upload/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          //console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setImageUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.filename
            );
            setHeader(res.data.header);
            setContent(res.data.content);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    setCallbackLink("/admin/" + _category);
  }, [props.match.params.id, props.location.category]);

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

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    // console.log("upload: ", data);
    let formData = new FormData();
    if (data && data.user_image && data.user_image.length > 0) {
      //console.log("upload: ", data.user_image[0]);
      formData.append("img", data.user_image[0]);
    }
    formData.append("_id", _id);
    formData.append("_category", category);
    formData.append("_header", header);
    formData.append("_content", content);

    AxiosCommon.post(`/upload/category/${category}`, formData, config)
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
    <div className="upload__image">
      <h1 className="dashboard__header">Chọn ảnh trên máy tính của bạn</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="upload__image__form"
      >
        <div className="upload__image__chooser">
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
            className="upload__image__choosefile"
          />
        </div>

        <div className="upload__image__chooser">
          <img key={_id} src={imageUrl} alt={header}></img>

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

          <div className="card__link__right upload__image__error__msg">
            <ul></ul>
          </div>
        </div>

        <div className="upload__image__contents">
          <div className="upload__contents__inputs">
            <label className="upload__contents__label">Tiêu đề:</label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "Tiêu đề",
              }}
              data={header}
              onChange={(e, editor) => setHeader(editor.getData())}
            />

            <label className="upload__contents__label">
              Nội dung bài viết:
            </label>
            <div className="upload__contents__ckeditor">
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: "Nội dung bài viết.",
                }}
                data={content}
                onChange={(e, editor) => setContent(editor.getData())}
              />
            </div>
          </div>
        </div>
        <div className="upload__image__buttons">
          <Link to={callback_link} ref={refBackLink} className="card__link">
            Back
          </Link>

          <input
            className="upload__image__submit card__link card__link__danger"
            type="submit"
            value="Upload"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
