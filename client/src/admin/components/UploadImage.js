import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./UploadImage.css";

function UploadImage({
  _category,
  _id,
  _filename,
  _header,
  _content,
  _callback_link,
}) {
  //console.log("UploadImage:", _category, _id, _filename, _header, _content);
  const { register, handleSubmit, errors } = useForm();
  const [imagePath, setImagePath] = useState("");

  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [callback_link, setCallbackLink] = useState("");
  const refBackLink = useRef(null);

  useEffect(() => {
    if (_header) setHeader(_header);
    if (_content) setContent(_content);
    if (_callback_link) setCallbackLink(_callback_link);
  }, [_header, _content, _callback_link]);

  const handleChangeFile = (e) => {
    try {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        if (file.size > 5000000)
          console.log("File size cannot exceed more than 5Mb");
        else {
          console.log("File:", e.target.value);
          setImagePath(e.target.value);
        }
      }
    } catch (error) {}
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
    formData.append("_filename", _filename);
    formData.append("_header", header);
    formData.append("_content", content);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.sid,
      },
    };

    AxiosCommon.post(`/upload/${_category}`, formData, config)
      .then((res) => {
        console.log("upload successfully: ", res);
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
    <div className="upload__image">
      <h5 className="upload__image__title">Chọn ảnh trên máy tính của bạn.</h5>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="upload__image__form"
      >
        <div className="upload__image__chooser">
          {errors.sliderbar1 && (
            <h1 style={{ color: "red" }}>{errors.sliderbar1.message}</h1>
          )}

          <input
            ref={register}
            type="file"
            accept="image/*"
            name="sliderbar1"
            value={imagePath}
            onChange={handleChangeFile}
            className="upload__image__choosefile"
          />

          <button
            type="button"
            className="card__link upload__image__clear"
            onClick={() => {
              //console.log("Xóa");
              setImagePath("");
            }}
          >
            Xóa
          </button>
        </div>

        <div className="upload__image__contents">
          <div className="upload__contents__img">
            {_filename && (
              <img
                key={_id}
                src={AxiosCommon.defaults.baseURL + "/images/" + _filename}
                alt={_header}
              ></img>
            )}
          </div>

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
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
