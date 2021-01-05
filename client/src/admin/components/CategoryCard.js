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
          <Link className="card__link" to={`/admin/category/${category._id}`}>
            {category.title}
          </Link>
        </div>

        <div className="category__card__field">{category.slogan}</div>

        <div className="category__card__field">{category.action_title1}</div>

        <div className="category__card__field">{category.action_body1}</div>

        <div className="category__card__field">{category.action_title2}</div>

        <div className="category__card__field">{category.action_body2}</div>

        <div className="category__card__field">{category.action_title3}</div>

        <div className="category__card__field">{category.action_body3}</div>
      </div>
      <img
        className="category__card__imgBody"
        src={AxiosCommon.defaults.baseURL + "/images/" + category.body_img}
        alt=""
      ></img>
    </div>
  );
}

export default CategoryCard;
