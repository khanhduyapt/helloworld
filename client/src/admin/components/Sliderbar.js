import React from "react";
import HpSliderBar from "../../components/HpSliderBar";
import "./Sliderbar.css";
import UseImages from "./UseImages";

function Sliderbar() {
  return (
    <div className="sliderbar__list">
      <div className="sliderbar__listimage">
        <h1 className="dashboard__header">Ảnh trang chủ</h1>
        <UseImages CNAME="sliderbar" />
      </div>

      <div className="sliderbar__preview">
        <h5>Preview:</h5>
        <HpSliderBar />
      </div>
    </div>
  );
}

export default Sliderbar;
