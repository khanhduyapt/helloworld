import "./Admins.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import AdminCard from "./AdminCard";

function Admins() {
  const [Administrators, setAdministrators] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/user/admins`, AxiosCommon.defaults.headers)
      .then((res) => {
        setAdministrators(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="students">
      <h1 className="dashboard__header">Danh sách quản trị viên</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/administrator/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="user__admin__deck" id="user__admin__deck">
        {Administrators.map((admin) => {
          return (
            <div
              key={`user_admin_row_${admin._id}`}
              id={`user_admin_row_${admin._id}`}
              className="user__admin__form"
            >
              <div className="user__admin__info">
                <AdminCard admin={admin} />

                <div className="user__admin__info__others">
                  {admin.account !== "admin" && (
                    <span
                      className="card__link card__link__danger card__link__bottom"
                      onClick={() => {
                        AxiosCommon.delete(
                          `/user/delete/${admin._id}`,
                          AxiosCommon.defaults.headers
                        )
                          .then((res) => {
                            //console.log("update user successfully: ", res);
                            if (res.status === 200) {
                              var elem = document.getElementById(
                                `user_admin_row_${admin._id}`
                              );
                              if (elem) {
                                elem.remove();
                              }
                            } else {
                              console.log(res.data.msg);
                            }
                          })
                          .catch((error) => {
                            console.log(error.message);
                          });
                        //----------------------
                      }}
                    >
                      Xóa quản trị viên
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admins;
