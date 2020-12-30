import "./AdminCard.css";
import React from "react";
import { Link } from "react-router-dom";
import CardIcon from "../../components/commons/CardIcon";
import AxiosCommon from "../../components/commons/AxiosCommon";

function AdminCard({ admin }) {
  //console.log("TeacherCard:", teacher);

  return (
    <div className="admin__card" key={`admin__card_${admin._id}`}>
      <img
        className="admin__card__avatar"
        src={AxiosCommon.defaults.baseURL + "/images/" + admin.avatar}
        alt=""
      ></img>

      <div className="admin__cardinfo">
        <div className="admin__card__field">
          <CardIcon icon="female_teacher.jpg" alt="full name" />

          <Link className="card__link" to={`/admin/administrator/${admin._id}`}>
            {admin.fullname}
          </Link>
        </div>

        <div className="admin__card__field">
          <CardIcon icon="id.png" alt="Mã học viên" />
          {admin.local_id}
        </div>

        <div className="admin__card__field">
          <CardIcon icon="account.jpg" alt="Tài khoản" />
          {admin.account}
        </div>

        <div className="admin__card__field">
          <CardIcon icon="phone_number.png" alt="Phone" />
          {admin.phone_number}
        </div>

        <div className="admin__card__field">
          <CardIcon icon="email.png" alt="Email" />
          {admin.email}
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
