import React, { useEffect, useState } from "react";
import "./Sliderbar.css";
import AxiosCommon from "../../components/commons/AxiosCommon";
import UploadImage from "./UploadImage";

function Sliderbar() {
  const [UpImages, setUpImages] = useState([]);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRHV5IiwiZW1haWwiOiJkQGQuZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc4MTMwM30.yyGfz6kr6rniSoextzAcx3T2aA13Peu3i-ZCfgfxP_o",
    },
  };
  useEffect(() => {
    AxiosCommon.get("/upload/sliderbar", config)
      .then((res) => {
        //console.log("upload success file: ", res);
        setUpImages(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id, header) => {
    console.log("delete:", id);

    if (
      window.confirm("Bạn có muốn xóa bài viết?\n" + `"` + header + `"`) ===
      true
    ) {
      AxiosCommon.delete(`/upload/${id}`, config)
        .then((res) => {
          console.log("delete:", res);
          var elem = document.getElementById("sliderbar__form__" + res.data.id);
          elem.parentNode.removeChild(elem);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleUpdate = (id) => {
    console.log("handleUpdate:", id);
    var header = document.getElementById("header_" + id);
    var content = document.getElementById("content_" + id);
    console.log("header:", header);
    console.log("content:", content);
  };

  return (
    <div className="sliderbar">
      <UploadImage category="sliderbar" />

      <div className="sliderbar__datagrid">
        {UpImages.map((item) => {
          return (
            <div
              key={item._id}
              className="sliderbar__form"
              id={`sliderbar__form__${item._id}`}
            >
              <img
                className="sliderbar__form__image"
                key={item._id}
                src={AxiosCommon.defaults.baseURL + "/images/" + item.filename}
                alt={item.header}
              ></img>

              <div className="sliderbar__content__inputs">
                {/* <p className="sliderbar__content__header">{item.header}</p>
                <p className="sliderbar__content__content">{item.content}</p> */}
                <input
                  name="header"
                  defaultValue={item.header}
                  id={`header_${item._id}`}
                  placeholder="Tiêu đề của ảnh"
                  className="form__input "
                ></input>

                <textarea
                  name="content"
                  rows={5}
                  defaultValue={item.content}
                  id={`content_${item._id}`}
                  placeholder="Nội dung chi tiết"
                  className="form__input "
                ></textarea>
              </div>

              <div className="sliderbar__content__buttons">
                <p
                  className="card__link"
                  onClick={() => handleUpdate(item._id)}
                >
                  Update
                </p>
                <p
                  className="card__link card__link__danger"
                  onClick={() => handleDelete(item._id, item.header)}
                >
                  Delete
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sliderbar;
