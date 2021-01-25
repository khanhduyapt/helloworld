import "./YoutubeCard.css";
import React from "react";
import { Link } from "react-router-dom";
import CardIcon from "../../components/commons/CardIcon";

import ReactHtmlParser from "react-html-parser";
import CurrencyInput from "react-currency-input";
import HpVideoCard from "../../components/commons/HpVideoCard";

function YoutubeCard({ youtube }) {
  //console.log("YoutubeCard:", youtube);

  return (
    <div className="youtube__card">
      {youtube && (
        <div className="youtube__card" key={`youtube__card_${youtube._id}`}>
          <HpVideoCard video={youtube} />

          <div className="youtube__cardinfo">
            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="online_class.jpg" alt="" />
                Khóa học
              </div>
              <Link className="card__link" to={`/admin/youtube/${youtube._id}`}>
                {youtube.title}
              </Link>
            </div>

            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="tuition_fee.png" alt="" />
                Học phí
              </div>
              <CurrencyInput
                name="number_lessons"
                value={youtube.tuition_fee}
                className="youtube__card__money"
                suffix=" (vnđ)"
                precision="0"
              />
            </div>

            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="calendar_time.jpg" alt="" />
                Thời lượng
              </div>
              <CurrencyInput
                name="number_lessons"
                value={youtube.duration_month}
                className="youtube__card__money"
                suffix=" (tháng)"
                precision="0"
              />
            </div>

            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="time.png" alt="" />
                Thời gian 1 buổi học
              </div>
              <CurrencyInput
                name="lesson_minutes"
                value={youtube.lesson_minutes}
                className="youtube__card__money"
                suffix=" (phút)"
                precision="0"
              />
            </div>

            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="number_lessons.png" alt="" />
                Số tiết học 1 tuần
              </div>
              <div className="youtube__card__label">
                {youtube.number_lessons}
                {" / tuần"}
              </div>
            </div>
            <div className="youtube__card__field">
              <div className="youtube__card__label">
                <CardIcon icon="calc.jpg" alt="" />
                Tổng
              </div>
              <div className="youtube__card__label">
                {youtube.number_lessons * 4 * youtube.duration_month} (tiết học)
              </div>
            </div>
          </div>

          <div className="youtube__card__notes">
            {ReactHtmlParser(youtube.notes)}
          </div>
        </div>
      )}
    </div>
  );
}

export default YoutubeCard;
