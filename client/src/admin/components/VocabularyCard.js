import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./VocabularyCard.css";
import VocabularyModal from "./VocabularyModal";

function VocabularyCard({ data }) {
  const [modalShow, setModalShow] = useState(false);
  const handleRegistData = (newdata) => {
    console.log("handleRegistData", newdata);
    data.title = newdata.title;
    data.short_content = newdata.short_content;
    data.thumbnail = newdata.thumbnail;
    data.contents = newdata.contents;
  };

  return (
    <div className="vocabulary__card">
      <VocabularyModal
        data={data}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onRegister={handleRegistData}
      />

      <div className="vocabulary__header">
        <div
          className="vocabulary__header__img card__link"
          onClick={() => {
            setModalShow(true);
          }}
        >
          <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className="vocabulary__header__content">
          <p
            data_id={data.id}
            className="vocabulary__header__title card__link"
            onClick={() => {
              setModalShow(true);
            }}
          >
            {data.title}
          </p>
          <p className="vocabulary__header__short_content">
            {data.short_content}
          </p>
        </div>
        <div className="vocabulary__header__control">
          <p
            className="card__link"
            onClick={() => {
              setModalShow(true);
            }}
          >
            View
          </p>
        </div>
      </div>
    </div>
  );
}

export default VocabularyCard;
