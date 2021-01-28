import "./NewsModal.css";
import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ReactHtmlParser from "react-html-parser";

function NewsModal(props) {
  return (
    <Modal
      {...props}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="mmodel"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {ReactHtmlParser(props.data.title)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mmodel__body">
          <div className="mmodel__thumbnail">
            <img className="" src={props.data.thumbnail} alt="" />
            {ReactHtmlParser(props.data.short_content)}
          </div>

          <div className="mmodel__center">
            {ReactHtmlParser(props.data.contents)}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewsModal;
