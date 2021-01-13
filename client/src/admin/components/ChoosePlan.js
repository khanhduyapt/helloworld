import "./ChoosePlan.css";
import React, { useEffect, useState } from "react";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ChoosePlanCard from "./ChoosePlanCard";

function ChoosePlan() {
  const [CourseList, setCourseList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/courses`, AxiosCommon.defaults.headers)
      .then((res) => {
        setCourseList(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="ChoosePlan">
      <h1 className="dashboard__header">
        Chọn khóa học hiển thị trên trang chủ
      </h1>
      <br></br>
      <div className="chooseplan__deck">
        {CourseList.map((course) => {
          return <ChoosePlanCard course={course} key={course._id} />;
        })}
      </div>
    </div>
  );
}

export default ChoosePlan;
