import "./ChoosePlanCard.css";
import React, { useState } from "react";
import HpCourseCard from "../../components/commons/HpCourseCard";
import CurrencyInput from "react-currency-input";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { Link } from "react-router-dom";

function ChoosePlanCard({ course }) {
  const [checked, set_checked] = useState(course.show_public);
  return (
    <div className="chooseplan__row">
      <div key={`courses_row_${course._id}`} className="chooseplan__row">
        <HpCourseCard course={course} />

        <div className="chooseplan__info">
          <div className="chooseplan__field">
            <div className="chooseplan__label">
              <CardIcon icon="tuition_fee.png" alt="" />
              Hiện thị trên trang chủ
            </div>
            <input
              type="checkbox"
              className="chooseplan__checkbox"
              value={checked}
              defaultChecked={course.show_public}
              onChange={() => {
                const newval = !checked;
                set_checked(newval);
                //console.log(`checked: ${course._id}=${newval}`);

                AxiosCommon.post(
                  `/courses/show/${course._id}`,
                  { show_public: newval },
                  AxiosCommon.defaults.headers
                )
                  .then((res) => {
                    console.log("upload successfully: ", res);
                    if (res.status === 200) {
                    } else {
                      console.log(res.data.msg);
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }}
            />
          </div>

          <div className="chooseplan__field">
            <div className="chooseplan__label">
              <CardIcon icon="tuition_fee.png" alt="" />
              Học phí
            </div>
            <CurrencyInput
              name="number_lessons"
              value={course.tuition_fee}
              className="chooseplan__money"
              suffix=" (vnđ)"
              precision="0"
            />
          </div>

          <div className="chooseplan__field">
            <div className="chooseplan__label"></div>
            <Link className="card__link" to={`/admin/course/${course._id}`}>
              Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePlanCard;
