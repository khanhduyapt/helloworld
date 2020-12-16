import "./HpMySpecial.css";
import React, { useEffect, useState } from "react";
import RoundCard from "./commons/RoundCard";
import AxiosCommon from "./commons/AxiosCommon";
import ReactHtmlParser from "react-html-parser";

function HpMySpecial() {
  const CNAME = "myspecial";
  const [UpImages, setUpImages] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/upload/category/${CNAME}`, AxiosCommon.defaults.headers)
      .then((res) => {
        //console.log("upload success file: ", res);
        setUpImages(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="whyus">
      <div className="whyus__title">
        <h1 className="blog__header">Điểm đặc biệt của Kimini</h1>
      </div>
      <div className="whyus__motive">
        {UpImages.map((item, index) => {
          return (
            <RoundCard
              image={AxiosCommon.defaults.baseURL + "/images/" + item.filename}
              href={`#wi${item._id}`}
              item_index={index + 1}
              title={ReactHtmlParser(item.header)}
            />
          );
        })}
      </div>

      <div className="whyus__motive__detail">
        <ul>
          {UpImages.map((item, index) => {
            return (
              <li
                key={`whyus_${item._id}`}
                id={`wi${item._id}`}
                className={index % 2 === 1 ? "skewR" : "skewL"}
                style={{
                  backgroundImage: `url(${
                    AxiosCommon.defaults.baseURL + "/images/" + item.filename
                  })`,
                }}
              >
                <div className={index % 2 === 1 ? "skewL" : "skewR"}>
                  <div
                    className={
                      "detailBox " + (index % 2 === 1 ? "posL" : "posR")
                    }
                  >
                    <h1>{ReactHtmlParser(item.header)}</h1>
                    <h5>{ReactHtmlParser(item.content)}</h5>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default HpMySpecial;
