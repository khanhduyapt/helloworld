import React from "react";
import "./Rating.css";

function Rating({ star }) {
  return (
    <div className="courses__card__rating">
      {Array(star)
        .fill()
        .map((_, i) => (
          <p key={i}>⭐</p>
        ))}
    </div>
  );
}

export default Rating;
