import "./UseImages.css";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ReactHtmlParser from "react-html-parser";

function UseImages({ CNAME }) {
  //const CNAME = "sliderbar";
  const [countImg, setCountImg] = useState(0);
  const [UpImages, setUpImages] = useState([]);
  const refEditItem = useRef(null);

  useEffect(() => {
    AxiosCommon.get(`/upload/category/${CNAME}`, AxiosCommon.defaults.headers)
      .then((res) => {
        setUpImages(() => {
          return [...res.data];
        });

        setCountImg(res.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [CNAME]);

  const handleDelete = (_id, _header) => {
    //console.log("delete:", _id, _header);

    if (window.confirm(`Bạn có muốn xóa bài viết?\n${_header}`) === true) {
      AxiosCommon.delete(`/upload/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("delete:", res);
          var elem = document.getElementById("useImages__form__" + res.data.id);
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
    <div className="useimages">
      <div className="main__top__controls">
        {countImg < 5 && (
          <Link
            className="card__link btn__outline__normal"
            to={{
              pathname: `/admin/${CNAME}/add`,
              category: CNAME,
            }}
          >
            Add new
          </Link>
        )}
      </div>

      <div className="useImages__datagrid">
        {UpImages.map((item) => {
          return (
            <div
              key={item._id}
              className="useImages__form"
              id={`useImages__form__${item._id}`}
            >
              <Link
                ref={refEditItem}
                className="card__link"
                to={{
                  pathname: `/admin/${CNAME}/${item._id}`,
                  category: CNAME,
                }}
              >
                <img
                  className="useImages__form__image card__link"
                  key={item._id}
                  src={
                    AxiosCommon.defaults.baseURL + "/images/" + item.filename
                  }
                  alt={item.header}
                  onClick={() => refEditItem.current.click()}
                ></img>
              </Link>

              <div className="useImages__content__inputs">
                <div className="useImages__content__header ">
                  <Link
                    ref={refEditItem}
                    className="card__link"
                    to={{
                      pathname: `/admin/${CNAME}/${item._id}`,
                      category: CNAME,
                    }}
                  >
                    {ReactHtmlParser(item.header)}
                  </Link>
                </div>
                <div className="useImages__content__content">
                  {ReactHtmlParser(item.content)}
                </div>
              </div>

              <div className="useImages__content__buttons">
                <Link
                  className="card__link"
                  to={{
                    pathname: `/admin/${CNAME}/${item._id}`,
                    category: CNAME,
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

export default UseImages;
