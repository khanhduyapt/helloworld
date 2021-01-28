import React from "react";
import "./ArticleCard.css";
import ReactHtmlParser from "react-html-parser";
import NewsModal from "./NewsModal";

function ArticleCard({ content }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);

  return (
    <div className="articleCard">
      <NewsModal
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <img className="articleCard__img" src={content.thumbnail} alt="" />

      <div className="articleCard__header">
        <h3 className="articleCard__header__title">
          <div
            className="card__link"
            onClick={() => {
              setModalData(content);
              setModalShow(true);
            }}
          >
            {ReactHtmlParser(content.title)}
          </div>
        </h3>
      </div>

      <div className="articleCard__caterogy__name">{content.category_name}</div>

      <div className="articleCard__short__content">
        {ReactHtmlParser(content.short_content)} [...]
      </div>
    </div>
  );
}

export default ArticleCard;
