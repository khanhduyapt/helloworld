import "./TeacherSchedule.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import SearchIcon from "../../components/commons/SearchIcon";
import StudentCard from "./StudentCard";
import { arrayRemove } from "../CommonUtil";
import TeacherCard from "./TeacherCard";

function TeacherSchedule(props) {
  const [_id, setId] = useState("");
  const { register, handleSubmit } = useForm();

  const [search_info, set_search_info] = useState("");
  const [search_student_result, set_search_student_result] = useState([]);

  const [teaching_students, set_teaching_students] = useState([]);
  const [teaching_student_ids, set_teaching_student_ids] = useState([]);

  const [fullname, set_fullname] = useState("");
  const [teacher, set_teacher] = useState({});

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      AxiosCommon.get(`/user/teacher/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            set_fullname(res.data.fullname);
            set_teacher(res.data);

            set_teaching_students(res.data.teaching_students);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.match.params.id, teaching_student_ids]);

  const onSubmitSearchForm = (data, e) => {
    e.preventDefault();

    AxiosCommon.post(
      `/user/students/search`,
      { search_info },
      AxiosCommon.defaults.headers
    ).then((res) => {
      console.log(`/user/students/search`, res);

      if (res.status !== 200) {
        alert(res.data.msg);
      } else {
        set_search_student_result(res.data);
      }
    });
  };

  return (
    <div>
      <div className="teacher__schedule">
        <TeacherCard teacher={teacher} />

        <Link
          className="card__link card__link__danger teacher__schedule__back"
          to="/admin/teachers"
        >
          List
        </Link>
      </div>

      <div className="teacher__schedule__get__students">
        <div className="teacher__schedule__search">
          <form
            onSubmit={handleSubmit(onSubmitSearchForm)}
            autoComplete="off"
            className="teacher__schedule__form"
          >
            <input
              name="search_info"
              ref={register}
              value={search_info}
              onChange={(e) => set_search_info(e.target.value)}
              className="teacher__schedule__searchinfo"
              placeholder="Nhập họ tên học viên, tài khoản đăng nhập, hoặc mã học viên..."
            />

            <button name="submit" className="" type="submit">
              <SearchIcon />
            </button>
          </form>

          {/*  search_student_result */}
          <div className="teacher__schedule__students">
            {search_student_result.map((student) => {
              return (
                <div
                  className="search__result"
                  key={student._id}
                  id={`candidate_${student._id}`}
                >
                  <StudentCard student={student} />

                  <div className="search__result__controls">
                    <button
                      type="button"
                      className="card__link"
                      onClick={() => {
                        if (student.course_details[0] === undefined) {
                          alert(
                            `Học viên ${student.fullname} chưa theo học khóa học nào.`
                          );
                          return;
                        }
                        console.log("Student:", student.course_details[0]);
                        const course_details_id = student.course_details[0]._id;

                        console.log(
                          "Thêm học sinh",
                          student._id,
                          "khóa học:",
                          course_details_id,
                          " Cho giao vien: ",
                          _id
                        );

                        AxiosCommon.post(
                          `/user/teacher/schedule/add`,
                          {
                            teacher_id: _id,
                            student_id: student._id,
                            course_details_id: course_details_id,
                          },
                          AxiosCommon.defaults.headers
                        ).then((res) => {
                          console.log(`/user/teacher/schedule/add`, res.data);

                          if (res.status !== 200) {
                            alert(res.data.msg);
                          } else {
                            //teaching_student_ids.push(student._id);

                            set_teaching_student_ids((prevVals) => {
                              return [...prevVals, ...student._id];
                            });

                            console.log(
                              "teaching_student_ids",
                              teaching_student_ids
                            );
                          }
                        });
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end search_student_result */}
        </div>

        <div className="teacher__schedule__responsible">
          <div className="teacher__responsible__header">
            Danh sách học viên
            <Link
              className="card__link margin__left__right__5px"
              to={`/admin/teacher/${_id}`}
            >
              {fullname}
            </Link>
            phụ trách
          </div>

          {/* teaching_students */}
          <div className="teacher__schedule__students">
            {teaching_students.map((teacher) => {
              return (
                <div
                  className="search__result"
                  key={teacher._id}
                  id={`candidate_${teacher._id}`}
                >
                  <StudentCard student={teacher} />

                  <div className="search__result__controls">
                    <button
                      type="button"
                      className="card__link card__link__danger"
                      onClick={() => {
                        console.log("teacher:", teacher);

                        const course_details_id = teacher.course_details[0];
                        if (!course_details_id) {
                          alert(
                            `Học viên ${teacher.fullname} chưa theo học khóa học nào.`
                          );
                          return;
                        }

                        console.log(
                          "Xóa học sinh",
                          teacher._id,
                          "khóa học:",
                          course_details_id,
                          " Cho giao vien: ",
                          _id
                        );

                        AxiosCommon.post(
                          `/user/teacher/schedule/remove`,
                          {
                            teacher_id: _id,
                            student_id: teacher._id,
                            course_details_id: course_details_id,
                          },
                          AxiosCommon.defaults.headers
                        ).then((res) => {
                          console.log(
                            `/user/teacher/schedule/remove`,
                            res.data
                          );

                          if (res.status !== 200) {
                            alert(res.data.msg);
                          } else {
                            set_teaching_student_ids((prevVals) => {
                              return arrayRemove([...prevVals], teacher._id);
                            });

                            console.log(
                              "teaching_student_ids",
                              teaching_student_ids
                            );
                          }
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end teaching_students */}
        </div>
      </div>
    </div>
  );
}

export default TeacherSchedule;
