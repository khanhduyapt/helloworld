import React from "react";
import "./CardIcon.css";
function CardIcon({ icon, alt, circle = false }) {
  return (
    <img
      src={`http://localhost:3000/icon/${icon}`}
      className={`card__icon ${circle ? "card__circle" : ""}`}
      alt={alt}
    ></img>
  );
}

export default CardIcon;
