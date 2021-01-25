import "./Youtube.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import YoutubeCard from "./YoutubeCard";
// import HpVideoCard from "../../components/commons/HpVideoCard";

function Youtube() {
  const [YoutubeList, setYoutubeList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/youtube`, AxiosCommon.defaults.headers)
      .then((res) => {
        setYoutubeList(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="youtube__list">
      <h1 className="dashboard__header">Trải nghiệm lớp học trực tuyến</h1>

      <div className="main__top__controls">
        <Link
          className="card__link btn__outline__normal"
          to={{
            pathname: `/admin/youtube/add`,
          }}
        >
          Add new
        </Link>
      </div>

      <div className="youtube__deck">
        {YoutubeList.map((youtube) => {
          return (
            <div key={`Youtube_row_${youtube._id}`} className="youtube__row">
              {/* <HpVideoCard video={youtube} /> */}

              <div className="youtube__info">
                <YoutubeCard youtube={youtube} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Youtube;
