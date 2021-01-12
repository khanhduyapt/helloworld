import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./HpSliderBar.css";
import AxiosCommon from "./commons/AxiosCommon";
import ReactHtmlParser from "react-html-parser";
import AOS from "aos";
import "aos/dist/aos.css";

function HpSliderBar() {
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198178.jpg",
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198163.jpg",
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198130.jpg",

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [UpImages, setUpImages] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();

    AxiosCommon.get("/upload/category/sliderbar", AxiosCommon.defaults.headers)
      .then((res) => {
        setUpImages(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="sliderbar" id="carousel_slider">
      <Carousel
        className="carousel"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {UpImages.map((item) => {
          return (
            <Carousel.Item className="carousel__item" key={item._id}>
              <img
                src={AxiosCommon.defaults.baseURL + "/images/" + item.filename}
                alt={item.header}
              ></img>

              <Carousel.Caption
                className="carousel__item__aption"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-anchor-placement="top-bottom"
                data-aos-once={false}
              >
                <div className="carousel__item__aptionHeader">
                  {ReactHtmlParser(item.header)}
                </div>

                <div className="carousel__item__aptionContent">
                  {ReactHtmlParser(item.content)}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default HpSliderBar;
