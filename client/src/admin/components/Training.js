import "./Training.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CategoryCard from "./CategoryCard";

function Training() {
  const [Administrators, setAdministrators] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/categories`, AxiosCommon.defaults.headers)
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
    <div className="training">
      <h1 className="dashboard__header">Danh mục khóa học</h1>

      <div className="training__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/category/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="training__deck" id="training__deck">
        {Administrators.map((category) => {
          return (
            <div
              key={`training_row_${category._id}`}
              id={`training_row_${category._id}`}
              className="training__form"
            >
              <div className="training__info">
                <CategoryCard category={category} />

                <div className="training__info__others">
                  {category.account !== "admin" && (
                    <span
                      className="card__link card__link__danger card__link__bottom"
                      onClick={() => {
                        AxiosCommon.delete(
                          `/categories/${category._id}`,
                          AxiosCommon.defaults.headers
                        )
                          .then((res) => {
                            //console.log("update user successfully: ", res);
                            if (res.status === 200) {
                              var elem = document.getElementById(
                                `training_row_${category._id}`
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
                      Xóa
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

export default Training;
