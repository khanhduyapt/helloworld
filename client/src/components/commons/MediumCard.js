import React from "react";
import "./MediumCard.css";

function MediumCard({ header, image, arr_contents }) {
  return (
    <div className="mediumCard">
      <h3 className="mediumCard__header">{header}</h3>

      <img className="mediumCard__img" src={image} alt={header} />

      <div className="mediumCard__contents">
        {arr_contents.map((item, index) => {
          return <p key={`mediumCard_key_${index}`}>{item}</p>;
        })}
      </div>
    </div>
  );
}

export default MediumCard;
