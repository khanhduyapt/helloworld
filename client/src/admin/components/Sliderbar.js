import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sliderbar.css";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ReactHtmlParser from "react-html-parser";

function Sliderbar() {
  const CNAME = "sliderbar";
  const [countImg, setCountImg] = useState(0);
  const [UpImages, setUpImages] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/upload/category/${CNAME}`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("upload success file: ", res);
        setUpImages(() => {
          return [...res.data];
        });

        setCountImg(res.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (_id, _header) => {
    //console.log("delete:", _id, _header);

    if (
      window.confirm("Bạn có muốn xóa bài viết?\n" + `"` + _header + `"`) ===
      true
    ) {
      AxiosCommon.delete(`/upload/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("delete:", res);
          var elem = document.getElementById("sliderbar__form__" + res.data.id);
          elem.parentNode.removeChild(elem);

          setCountImg((length) => {
            return length - 1;
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="sliderbar">
      <div className="main__top__controls">
        {countImg < 5 && (
          <Link
            className="card__link btn__outline__normal"
            to={{
              pathname: `/admin/sliderbar/add`,
              category: "sliderbar",
            }}
          >
            Add new
          </Link>
        )}
      </div>

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
                <div className="sliderbar__content__header">
                  {ReactHtmlParser(item.header)}
                </div>
                <div className="sliderbar__content__content">
                  {ReactHtmlParser(item.content)}
                </div>
              </div>

              <div className="sliderbar__content__buttons">
                <Link
                  className="card__link"
                  to={{
                    pathname: `/admin/sliderbar/${item._id}`,
                    category: "sliderbar",
                  }}
                >
                  Edit
                </Link>

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
