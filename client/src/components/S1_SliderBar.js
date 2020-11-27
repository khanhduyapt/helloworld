import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./S1_SliderBar.css";

function S1_SliderBar() {
  const photos = [
    {
      name: "photo1",
      url:
        "https://image.shutterstock.com/image-photo/class-teacher-600w-21198178.jpg",
    },
    {
      name: "photo2",
      url:
        "https://image.shutterstock.com/image-photo/class-teacher-600w-21198163.jpg",
    },
    {
      name: "photo3",
      url:
        "https://image.shutterstock.com/image-photo/class-teacher-600w-21198130.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="sliderbar">
      <Carousel
        className="carousel"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {photos.map((photo, idx) => {
          return (
            <Carousel.Item className="carousel__item" key={idx}>
              <img src={photo.url} alt={photo.name}></img>

              <Carousel.Caption className="carousel__item__aption">
                <h1>First slide label {photo.name}</h1>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum{" "}
                  {photo.name}.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default S1_SliderBar;
