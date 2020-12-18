import React from "react";
import "./CardIcon.css";
function CardIcon({ icon, alt }) {
  return (
    <img
      src={`http://localhost:3000/icon/${icon}`}
      className="card__icon"
      alt={alt}
    ></img>
  );
}

export default CardIcon;
