import React from "react";
import "./ArticleCard.css";
import VisibilityIcon from "@material-ui/icons/Visibility";

function ArticleCard({
  title,
  artical_url,
  category_name,
  category_url,
  read_count,
  short_content,
  thumbnail,
}) {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  //onClick={() => {openInNewTab('https://stackoverflow.com')}}

  return (
    <div className="articleCard">
      <a href={category_url}>
        <img className="articleCard__img" src={thumbnail} alt={title} />
      </a>

      <div className="articleCard__header">
        <h3 className="articleCard__header__title">
          <p
            className="card__link"
            onClick={() => {
              openInNewTab(artical_url);
            }}
          >
            {title}
          </p>
        </h3>

        <div className="articleCard__header__reads">
          <VisibilityIcon /> <p>{read_count}</p>
        </div>
      </div>

      <div className="articleCard__caterogy__name">
        <p
          className="card__link"
          onClick={() => {
            openInNewTab(category_url);
          }}
        >
          {category_name}
        </p>
      </div>

      <div className="articleCard__short__content">{short_content} [...]</div>
    </div>
  );
}

export default ArticleCard;
