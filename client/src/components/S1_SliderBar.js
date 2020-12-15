import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./S1_SliderBar.css";
import AxiosCommon from "./commons/AxiosCommon";

function S1_SliderBar() {
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198178.jpg",
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198163.jpg",
  //"https://image.shutterstock.com/image-photo/class-teacher-600w-21198130.jpg",

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [UpImages, setUpImages] = useState([]);

  useEffect(() => {
    AxiosCommon.get("/upload/sliderbar", AxiosCommon.defaults.headers)
      .then((res) => {
        console.log("upload success file: ", res);
        setUpImages(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="sliderbar">
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

              <Carousel.Caption className="carousel__item__aption">
                <h1>{item.header}</h1>
                <p>{item.content}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default S1_SliderBar;
