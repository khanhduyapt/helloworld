import React from "react";
import "./MySpecial.css";
import UseImages from "./UseImages";
function MySpecial() {
  return (
    <div className="MySpecial">
      <h1 className="dashboard__header">Điểm đặc biệt của Kimini</h1>
      <UseImages CNAME="myspecial" />
    </div>
  );
}

export default MySpecial;
