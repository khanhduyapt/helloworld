import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sliderbar.css";
import AxiosCommon from "../../components/commons/AxiosCommon";

function Sliderbar() {
  const [countImg, setCountImg] = useState(0);
  const [UpImages, setUpImages] = useState([]);

  useEffect(() => {
    AxiosCommon.get("/upload/sliderbar", AxiosCommon.defaults.headers)
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

  const handleDelete = (id, header) => {
    console.log("delete:", id);

    if (
      window.confirm("Bạn có muốn xóa bài viết?\n" + `"` + header + `"`) ===
      true
    ) {
      AxiosCommon.delete(`/upload/${id}`, AxiosCommon.defaults.headers)
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
                <p className="sliderbar__content__header">{item.header}</p>
                <p className="sliderbar__content__content">{item.content}</p>
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
