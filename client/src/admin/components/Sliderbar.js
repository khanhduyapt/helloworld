import React, { useState } from "react";
import "./Sliderbar.css";
import { useForm } from "react-hook-form";
import AxiosCommon from "../../components/commons/AxiosCommon";

function Sliderbar() {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [imagePath, setImagePath] = useState("");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    console.log("upload: ", data);
    if (data) {
      console.log("upload length: ", data.sliderbar1.length);
      let formData = new FormData();
      formData.append("sliderbar", data.sliderbar1[0]);

      AxiosCommon.post("/upload", formData, {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-type": "multipart/form-data",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRHV5IiwiZW1haWwiOiJkQGQuZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc4MTMwM30.yyGfz6kr6rniSoextzAcx3T2aA13Peu3i-ZCfgfxP_o",
        },
      })
        .then((res) => {
          console.log("upload successfully: ", res);
          if (res.status == 200) {
            alert("upload successfully" + "/n" + res.data.filename);
            setValue("sliderbar1", "");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="Sliderbar">
      <h1>Sliderbar</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <input
          type="file"
          accept="image/*"
          name="sliderbar1"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="Đường dẫn đến ảnh trên máy tính của bạn."
          ref={register({ required: true })}
          className="form__input"
        />
        {errors.image && (
          <p style={{ color: "red" }}>{errors.sliderbar1.message}</p>
        )}
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Sliderbar;
