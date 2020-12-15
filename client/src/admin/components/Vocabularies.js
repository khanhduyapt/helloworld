import React, { useEffect, useState } from "react";
import "./Vocabularies.css";
import axios from "axios";
import VocabularyCard from "./VocabularyCard";
import VocabularyModal from "./VocabularyModal";

function Vocabularies() {
  const [Articles, setArticles] = useState([]);
  const [isShowAddModel, setShowAddModel] = useState(false);
  const handleRegistArticle = (data) => {
    if (data._id) {
      setArticles([data, ...Articles]);
    }
  };
  let newItem = {
    _id: "",
    category_name: "",
    thumbnail: "",
    title: "",
    short_content: "",
    contents: "",
  };
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
      <VocabularyModal
        data={newItem}
        show={isShowAddModel}
        onHide={() => setShowAddModel(false)}
        onRegister={handleRegistArticle}
      />

      <div className="main__top__controls">
        <button
          className="btn__outline__normal"
          onClick={() => setShowAddModel(true)}
        >
          Add new
        </button>
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
