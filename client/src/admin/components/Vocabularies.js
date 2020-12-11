import React, { useEffect, useState } from "react";
import "./Vocabularies.css";
import axios from "axios";
import VocabularyCard from "./VocabularyCard";

function Vocabularies() {
  const [Articles, setArticles] = useState([]);

  useEffect(() => {
    let cancel;

    axios({
      method: "GET",
      url: "http://localhost:3001/articles",
      params: { p: 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setArticles(() => {
          return [...res.data];
        });
      })
      .catch((e) => {
        console.log("error:", e);
      });

    return () => {
      cancel();
    };
  }, []);

  return (
    <div className="Vocabularies">
      <div className="vocabularies__controls">
        <button className="btn__outline__normal">Add new</button>
      </div>
      <div className="vocabularies__datagrid">
        {Articles.map((item, index) => {
          return <VocabularyCard key={`voca_${item._id}`} data={item} />;
        })}
      </div>
    </div>
  );
}

export default Vocabularies;
