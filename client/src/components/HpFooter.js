import React from "react";
import "./HpFooter.css";

function HpFooter() {
  return (
    <div className="footer">
      <a href="#contacts">
        <div className="to_contacts">
          <p>Liên </p>
          <p>hệ</p>
          <p>giáo</p>
          <p>viên</p>
        </div>
      </a>

      <p id="backtoTop">
        <a href="#root">TOP</a>
      </p>
    </div>
  );
}

export default HpFooter;
