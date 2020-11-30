import React from "react";
import "./RoundCard.css";
function RoundCard({ image, href, item_index, title }) {
  return (
    <div
      className="roundCard"
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <a href={href} className="card__link">
        <h1>{item_index}</h1>
        <h3>{title}</h3>
      </a>
    </div>
  );
}

export default RoundCard;
