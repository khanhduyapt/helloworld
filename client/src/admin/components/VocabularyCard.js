import React, { useState } from "react";
import "./VocabularyCard.css";
import VocabularyModal from "./VocabularyModal";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function VocabularyCard({ data }) {
  const [modalShow, setModalShow] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleCloseConfirmDelete = () => setShowConfirmDialog(false);
  const handleShowConfirmDelete = () => setShowConfirmDialog(true);
  const handleDeleteItem = () => {
    axios
      .delete(`http://localhost:3001/articles/${data._id}`)
      .then((res) => {
        // console.log("handleDelete", data._id);
        var elem = document.getElementById(data._id);
        elem.parentNode.removeChild(elem);

        setShowConfirmDialog(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRegistData = (newdata) => {
    //console.log("handleRegistData", newdata);
    data.title = newdata.title;
    data.short_content = newdata.short_content;
    data.thumbnail = newdata.thumbnail;
    data.contents = newdata.contents;
  };

  return (
    <div className="vocabulary__card" id={data._id}>
      <VocabularyModal
        data={data}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onRegister={handleRegistData}
      />

      <Modal
        show={showConfirmDialog}
        onHide={handleCloseConfirmDelete}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body className="vocabulary__card__delete">
          <img src={data.thumbnail} alt={ReactHtmlParser(data.title)} />
          <p>
            Bạn có muốn xóa bài viêt:
            <br />
            <span className="card__link">{ReactHtmlParser(data.title)}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn__outline__normal"
            onClick={handleCloseConfirmDelete}
          >
            Close
          </button>
          <button className="btn__outline__danger" onClick={handleDeleteItem}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <div className="vocabulary__header">
        <div
          className="vocabulary__header__img card__link"
          onClick={() => {
            setModalShow(true);
          }}
        >
          <img src={data.thumbnail} alt={ReactHtmlParser(data.title)} />
        </div>
        <div className="vocabulary__header__content">
          <p
            data_id={data._id}
            className="vocabulary__header__title card__link"
            onClick={() => {
              setModalShow(true);
            }}
          >
            {ReactHtmlParser(data.title)}
          </p>
          <p className="vocabulary__header__short_content">
            {ReactHtmlParser(data.short_content)}
          </p>
        </div>
        <div className="vocabulary__header__control">
          <p
            className="card__link"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Edit
          </p>
          <p
            className="card__link card__link__danger"
            onClick={handleShowConfirmDelete}
          >
            Delete
          </p>
        </div>
      </div>
    </div>
  );
}

export default VocabularyCard;
