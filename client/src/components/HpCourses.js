import React, { useEffect, useState } from "react";
import "./HpCourses.css";
import CardDeck from "react-bootstrap/CardDeck";
// import CourseModal from "./commons/CourseModal";
import AOS from "aos";
import "aos/dist/aos.css";
import HpCourseCard from "./commons/HpCourseCard";
import AxiosCommon from "./commons/AxiosCommon";

function HpCourses() {
  const [CourseList, setCourseList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/public/courses`, AxiosCommon.defaults.headers)
      .then((res) => {
        setCourseList(() => {
          return [...res.data];
        });

        AOS.init({
          duration: 1000,
          once: true,
        });
        AOS.refresh();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="s4sourses" id="featured_courses">
      <h1
        className="blog__header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        Khóa học nổi bật
      </h1>
      <div className="special__courses">
        <CardDeck className="special__courses__deck">
          {CourseList.map((course) => {
            return <HpCourseCard key={course._id} course={course} />;
          })}
        </CardDeck>
      </div>
    </div>
  );
}

export default HpCourses;
