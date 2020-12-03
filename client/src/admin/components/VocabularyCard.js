import React from "react";
import "./VocabularyCard.css";
function VocabularyCard({ data }) {
  const handleClick = () => {
    console.log("vocabulary__detail");
  };
  return (
    <div className="vocabulary__card">
      <div className="vocabulary__header">
        <div className="vocabulary__header__img card__link">
          <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className="vocabulary__header__content">
          <p
            className="vocabulary__header__title card__link"
            onClick={handleClick}
          >
            {data.title}
          </p>
          <p className="vocabulary__header__short_content">
            {data.short_content}
          </p>
        </div>
      </div>
      <div
        className="vocabulary__detail visibility__collapse"
        id={`vocabulary__card__${data.id}`}
      >
        <p>{data.title}</p>
        <p>{data.category_name}</p>
        <p>{data.short_content}</p>
        <p>{data.contents}</p>
      </div>
    </div>
  );
}

export default VocabularyCard;
