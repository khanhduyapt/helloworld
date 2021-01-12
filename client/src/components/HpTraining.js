import "./HpTraining.css";
import React, { useEffect } from "react";
import Tabs, { Tab } from "./commons/Tabs";
import AOS from "aos";
import "aos/dist/aos.css";

function HpTraining() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className="satisfact"
      id="education_program"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    >
      <div className="tabs">
        <h1 className="blog__header">Chương trình đào tạo</h1>
        <Tabs>
          <Tab
            id="courses1"
            label="Tiếng Anh"
            main="Mẫu giáo"
            image="https://llv.edu.vn/images/img1-courses.jpg"
          >
            <div className="lession course__body1">
              <h2 className="course__header1">
                Học tiếng Anh theo cách trẻ bản ngữ học tiếng mẹ đẻ
              </h2>
              <img
                className="sourse__body1__icon"
                src="https://llv.edu.vn/images/vyl/icon-usp-vyl-1.png"
                alt=""
              />
              <ul className="sourse__body1__ul">
                <li className="sourse__body1__li1">
                  <h3>Học qua các hoạt động thể chất</h3>
                  <h4>
                    Giúp trẻ hào hứng học tiếng Anh và phát triển kỹ năng ngôn
                    ngữ theo cách tự nhiên.
                  </h4>
                </li>
                <li className="sourse__body1__li2">
                  <h3>Học theo phương pháp ghép vần</h3>
                  <h4>
                    Giúp trẻ chuẩn hóa phát âm, tạo nền tảng vững chắc cho việc
                    đọc và viết tiếng Anh chuẩn xác.
                  </h4>
                </li>
                <li className="sourse__body1__li3">
                  <h3>Học qua truyện kể</h3>
                  <h4>
                    Giúp trẻ biết hình thành khả năng cảm thụ văn học thể giới
                    và nhận thức được cách sử dụng từ một cách tự nhiên như
                    người bản ngữ.
                  </h4>
                </li>
              </ul>
            </div>
          </Tab>

          <Tab
            id="courses2"
            label="Tiếng Anh"
            main="Tiểu học"
            image="https://llv.edu.vn/images/img2-courses.jpg"
          >
            <div className="lession course__body2">
              <p>Tab 2 content</p>
            </div>
          </Tab>
          <Tab
            id="courses3"
            label="Tiếng Anh"
            main="THCS"
            image="https://llv.edu.vn/images/img3-courses.jpg"
          >
            <div className="lession course__body3">
              <p>Tab 3 content</p>
            </div>
          </Tab>

          <Tab
            id="courses4"
            label="Tiếng Anh"
            main="Dự bị đại học Quốc tế"
            image="https://llv.edu.vn/images/img4-courses.jpg"
          >
            <div className="lession course__body4">
              <p>Tab 4 content</p>
            </div>
          </Tab>

          <Tab
            id="courses5"
            label="Tiếng Anh"
            main="Luyện thi IELTS"
            image="https://llv.edu.vn/images/img5-courses.jpg"
          >
            <div className="lession course__body5">
              <p>Tab 5 content</p>
            </div>
          </Tab>

          <Tab
            id="courses6"
            label="Tiếng Anh"
            main="Giao tiếp chuyên nghiệp"
            image="https://llv.edu.vn/images/img6-courses.jpg"
          >
            <div className="lession course__body6">
              <p>Tab 6 content</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default HpTraining;
