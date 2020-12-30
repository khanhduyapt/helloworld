import "./CategoryCard.css";
import React from "react";
import { Link } from "react-router-dom";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";

function CategoryCard({ category }) {
  //console.log("TeacherCard:", teacher);

  return (
    <div className="category__card" key={`category__card_${category._id}`}>
      <img
        className="category__card__avatar"
        src={AxiosCommon.defaults.baseURL + "/images/" + category.avatar}
        alt=""
      ></img>

      <div className="category__cardinfo">
        <div className="category__card__field">
          <CardIcon icon="female_teacher.jpg" alt="full name" />

          <Link className="card__link" to={`/admin/category/${category._id}`}>
            {category.fullname}
          </Link>
        </div>

        <div className="category__card__field">
          <CardIcon icon="id.png" alt="Mã học viên" />
          {category.local_id}
        </div>

        <div className="category__card__field">
          <CardIcon icon="account.jpg" alt="Tài khoản" />
          {category.account}
        </div>

        <div className="category__card__field">
          <CardIcon icon="phone_number.png" alt="Phone" />
          {category.phone_number}
        </div>

        <div className="category__card__field">
          <CardIcon icon="email.png" alt="Email" />
          {category.email}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
