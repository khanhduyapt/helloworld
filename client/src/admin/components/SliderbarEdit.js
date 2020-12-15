import React, { useState } from "react";
import { useEffect } from "react";
import AxiosCommon from "../../components/commons/AxiosCommon";
import "./SliderbarEdit.css";
import UploadImage from "./UploadImage";

function SliderbarEdit(props) {
  //console.log("SliderbarEdit:", props);
  const [_id, setId] = useState("");
  const [filename, setFilename] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setId(props.match.params.id);

    console.log("SliderbarEdit id:", _id);

    if (_id && _id !== "add") {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRHV5IiwiZW1haWwiOiJkQGQuZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc4MTMwM30.yyGfz6kr6rniSoextzAcx3T2aA13Peu3i-ZCfgfxP_o",
        },
      };

      AxiosCommon.get(`/upload/${_id}`, config)
        .then((res) => {
          //console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setFilename(res.data.filename);
            setHeader(res.data.header);
            setContent(res.data.content);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.location.category, props.match.params.id, _id]);

  return (
    <div className="sliderbar__edit">
      {_id && _id !== "" && (
        <UploadImage
          _category="sliderbar"
          _id={_id}
          _filename={filename}
          _header={header}
          _content={content}
          _callback_link="/admin/sliderbar"
        />
      )}
    </div>
  );
}

export default SliderbarEdit;
