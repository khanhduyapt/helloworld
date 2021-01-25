import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "./CourseModal.css";
import Rating from "./Rating";
import AxiosCommon from "./AxiosCommon";
import ReactHtmlParser from "react-html-parser";

function CourseModal(props) {
  return (
    <Modal
      {...props}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="course__modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.course_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="course__modal__body">
          <div className="couse__modal__left">
            <img
              className="couse__modal__left-img"
              src={
                AxiosCommon.defaults.baseURL + "/images/" + props.data.avatar
              }
              alt={props.data.course_name}
            />
            <h4>{props.data.lessions} Bài học</h4>
            <h4>Thời lượng {props.data.one_lession_time}</h4>
            <Rating star={5} />
          </div>
          <div className="couse__modal__center">
            {ReactHtmlParser(props.data.notes)}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CourseModal;
