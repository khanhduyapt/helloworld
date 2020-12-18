import "./Students.css";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CardIcon from "../../components/commons/CardIcon";

function Students() {
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
  }, []);

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
      <h1 className="dashboard__header">Danh sách học viên</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/student/add`,
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
                  className="student__image"
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
                      }}
                    >
                      {student.fullname}
                    </Link>
                  </div>
                  <div className="student__contents">
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="online_class.jpg" alt="Lớp" />
                      </p>
                      <span className="card__link">Lớp abcdef</span>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="calendar_time.jpg" alt="Thời gian" />
                      </p>
                      <p className="student__field__content">
                        <span className="card__link">start date</span> ~{" "}
                        <span className="card__link">end date</span>
                      </p>
                    </div>

                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="account.jpg" alt="Tài khoản" />
                      </p>
                      <p className="student__field__content">
                        {student.account}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="facebook.jpg" alt="Facebook" />
                      </p>
                      <p className="student__field__content">
                        {student.facebook}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="phone_number.png" alt="Facebook" />
                      </p>
                      <p className="student__field__content">
                        {student.phone_number}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="skype.png" alt="Skype" />
                      </p>
                      <p className="student__field__content">
                        {student.skype_id}
                      </p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="email.png" alt="Email" />
                      </p>
                      <p className="student__field__content">{student.email}</p>
                    </div>
                    <div className="student__contents__field">
                      <p className="student__field__label">
                        <CardIcon icon="zoom.png" alt="Zoom" />
                      </p>
                      <p className="student__field__content">
                        {student.zoom_id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="student__info__others">
                  <textarea
                    name="student_notes"
                    rows="5"
                    placeholder="Tin nhắn chi tiết. &#10;Thời gian chích hợp để liên hệ với bạn."
                  />
                </div>
              </div>

              {/* <div className="student__buttons">
                <Link
                  className="card__link hor__center"
                  to={{
                    pathname: `/user/students/${student._id}`,
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
