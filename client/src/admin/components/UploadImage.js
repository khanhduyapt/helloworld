import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AxiosCommon from "../../components/commons/AxiosCommon";

import "./UploadImage.css";

function UploadImage({ category }) {
  //console.log("data:", data);
  const { register, handleSubmit, setValue } = useForm();
  const [imagePath, setImagePath] = useState("");

  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const config = {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-type": "multipart/form-data",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRHV5IiwiZW1haWwiOiJkQGQuZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc4MTMwM30.yyGfz6kr6rniSoextzAcx3T2aA13Peu3i-ZCfgfxP_o",
    },
  };

  const [isUploadDisabled, setIsUploadDisabled] = useState(true);

  const handleChangeFile = (e) => {
    setIsUploadDisabled(true);
    try {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        if (file.size > 5000000)
          console.log("File size cannot exceed more than 5Mb");
        else {
          console.log("File:", e.target.value);
          setImagePath(e.target.value);
          setIsUploadDisabled(false);
        }
      }
    } catch (error) {}
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    // console.log("upload: ", data);
    if (data && data.sliderbar1 && data.sliderbar1.length > 0) {
      console.log("upload length: ", data.sliderbar1.length);
      let formData = new FormData();
      formData.append("img", data.sliderbar1[0]);
      formData.append("header", header);
      formData.append("content", content);
      AxiosCommon.post(`/upload/${category}`, formData, config)
        .then((res) => {
          console.log("upload successfully: ", res);
          if (res.status === 200) {
            alert("upload successfully" + "/n" + res.data.filename);
            setImagePath("");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.log("Chọn ảnh!");
    }

    setIsUploadDisabled(true);
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
          <input
            ref={register({ required: true })}
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
              console.log("Xóa");
              setImagePath("");
              setIsUploadDisabled(true);
            }}
          >
            Xóa
          </button>
        </div>

        <div className="upload__image__contents">
          <img className="upload__contents__img"></img>
          <div className="upload__contents__inputs">
            <input
              name="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Tiêu đề của ảnh"
              className="form__input upload__image__header"
            ></input>

            <textarea
              name="content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nội dung chi tiết"
              className="form__input upload__image__content"
            ></textarea>
          </div>
        </div>

        <input
          className={
            "upload__image__submit card__link " +
            (isUploadDisabled === true ? " card__link__disable" : "")
          }
          type="submit"
          value="Upload"
        ></input>
      </form>
    </div>
  );
}

export default UploadImage;
