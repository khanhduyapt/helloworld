import React, { useEffect } from "react";
import "./HpFooter.css";
import AOS from "aos";
import "aos/dist/aos.css";

function HpFooter() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="footer">
      <a href="#contacts" data-aos="fade-up">
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
