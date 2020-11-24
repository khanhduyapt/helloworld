import React, { createRef, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./S1_SliderBar.css";

function S1_SliderBar() {
  const photos = [
    {
      name: "photo1",
      url: "https://sohanews.sohacdn.com/2014/t565467-59b76.jpg",
    },
    {
      name: "photo2",
      url:
        "https://image.plo.vn/w653/Uploaded/2020/vocgmvbg/2015_05_15/quynhchi_lapw.jpg",
    },
    {
      name: "photo3",
      url:
        "https://nguoi-noi-tieng.com/photo/tieu-su-chi-pu-nguyen-thuy-chi-2445.jpg",
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
        {photos.map((photo) => {
          return (
            <Carousel.Item className="carousel__item" key={photo.name}>
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
