import React, { useEffect } from "react";
import "./HpChoosePlan.css";
import AOS from "aos";
import "aos/dist/aos.css";
// import HpVideoCard from "./commons/HpVideoCard";

function HpChoosePlan() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="plan" id="experience_online_classes">
      <h1
        className="blog__header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        Trải nghiệm lớp học trực tuyến
      </h1>

      <div className="video__samples">
        <div className="video__samples__deck">
          {/* {videos.map((video) => {
            return <HpVideoCard video={video} />;
          })} */}
        </div>
      </div>
    </div>
  );
}

export default HpChoosePlan;
