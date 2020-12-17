import "./Students.css";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";

function Students() {
  const CNAME = "sliderbar";
  const [StudentList, setStudentList] = useState([]);
  const refEditItem = useRef(null);

  useEffect(() => {
    AxiosCommon.get(`/user/students`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("upload success file: ", res);
        setStudentList(() => {
          return [...res.data];
        });
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
          var elem = document.getElementById("student__form__" + res.data.id);
          elem.parentNode.removeChild(elem);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="students">
      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/user/${CNAME}/add`,
            category: CNAME,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="student__deck">
        {StudentList.map((student) => {
          return (
            <div
              key={student._id}
              className="student__form"
              id={`student__form__${student._id}`}
            >
              <div className="student__info">
                <img
                  className="student__image card__link"
                  key={student._id}
                  src={
                    AxiosCommon.defaults.baseURL + "/images/" + student.avatar
                  }
                  alt={student.fullname}
                  onClick={() => refEditItem.current.click()}
                ></img>

                <div className="student__inputs">
                  <div className="student__header">
                    <Link
                      ref={refEditItem}
                      className="card__link"
                      to={{
                        pathname: `/user/students/${student._id}`,
                        category: CNAME,
                      }}
                    >
                      {student.fullname}
                    </Link>
                  </div>
                  <div className="student__contents">
                    <div className="student__contents__field">
                      <p className="student__field__label">Lớp: </p>
                      <span className="card__link">Lớp abcdef</span>
                    </div>
                    <div className="student__field__content">
                      <p className="student__field__content">
                        Thời gian :
                        <span className="card__link">start date</span> ~{" "}
                        <span className="card__link">end date</span>
                      </p>
                    </div>

                    <div className="student__contents__field">
                      <p className="student__field__label">Tài khoản: </p>
                      <p className="student__field__content">
                        {student.account}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">facebook: </p>
                      <p className="student__field__content">
                        {student.facebook}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">phone_number: </p>
                      <p className="student__field__content">
                        {student.phone_number}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">skype_id: </p>
                      <p className="student__field__content">
                        {student.skype_id}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">email: </p>
                      <p className="student__field__content">{student.email}</p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">zoom_id: </p>
                      <p className="student__field__content">
                        {student.zoom_id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="student__buttons">
                <Link
                  className="card__link hor__center"
                  to={{
                    pathname: `/user/${CNAME}/${student._id}`,
                    category: CNAME,
                  }}
                >
                  Edit
                </Link>

                <p
                  className="card__link card__link__danger hor__center"
                  onClick={() => handleDelete(student._id, student.header)}
                >
                  Delete
                </p>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Students;
