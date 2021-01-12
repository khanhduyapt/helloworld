import "./MySpecial.css";
import React from "react";
import UseImages from "./UseImages";
import HpMySpecial from "../../components/HpMySpecial";
function MySpecial() {
  return (
    <div className="MySpecial">
      <h1 className="dashboard__header">Điểm đặc biệt</h1>
      <UseImages CNAME="myspecial" />

      <div className="preview">
        <h5>Preview:</h5>
        <hr />
        <HpMySpecial />
      </div>
    </div>
  );
}

export default MySpecial;
