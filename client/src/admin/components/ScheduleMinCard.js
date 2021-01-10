import "./ScheduleMinCard.css";
import React from "react";
import SymbolTo from "../../components/commons/SymbolTo";

function ScheduleMinCard({ sche_no, start_time, end_time }) {
  return (
    <div className="ScheduleMinCard">
      <div className="item__badge smc__marginLeft">{sche_no}</div>{" "}
      <div className="ScheduleMinCard__field">
        {start_time}
        <SymbolTo />
        {end_time}
      </div>
    </div>
  );
}

export default ScheduleMinCard;
