import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "./CourseModal.css";
import Rating from "./Rating";
function CourseModal(props) {
  const benefits = [
    "Tăng cường tự tin nói tiếng Anh theo câu bằng cách chơi đùa cùng với các câu chuyện.",
    "Phát triển tính sáng tạo và bắt đầu diễn đạt các ý kiến riêng của trẻ.",
    "Phát triển các kỹ năng đọc viết để bắt đầu đọc và viết, sẵn sàng cho bậc học cấp một.",
  ];
  const methods = [
    "mô tả, bắt chước và thay đổi các câu chuyện quen thuộc",
    "sáng tạo các câu chuyện và thể hiện chúng thông qua nghệ thuật, kịch, nhảy múa, động tác, công nghệ thông tin hay viết",
    "nhận thức được cảm xúc của bản thân và mô tả một số cảm xúc đó",
    "mô tả bản thân trẻ và diễn đạt những ưa thích và các quan điểm",
    "tạo ra những chữ cái có thể nhận biết và cố gắng viết ra các câu ngắn",
    "mở rộng vốn từ vựng bằng cách nhóm và đặt tên các đồ vật",
    "liên kết âm thanh tới các chữ cái, bắt đầu phân đoạn âm thanh thành các từ đơn giản và kết hợp chúng lại với nhau để đọc",
    "nhận biết các chữ cái và đếm tới số 20",
    "đếm các mục thành hai hoặc ba nhóm, và ghi lại các mục đó bằng các dấu hiệu mà trẻ có thể diễn giải và giải thích",
    "sắp xếp thứ tự các sự kiện quen thuộc và các bước quen thuộc trong các nhiệm vụ hàng ngày",
    "Tái lập lại các vai trò và những trải nghiệm trong các tình huống của trò chơi",
  ];
  return (
    <Modal
      {...props}
      size="xl"
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.course_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="course__modal">
          <div className="couse__modal__left">
            <img
              className="couse__modal__left-img"
              src={props.data.imgage}
              alt={props.data.course_name}
            />
            <h4>{props.data.lessions} Bài học</h4>
            <h4>Thời lượng {props.data.one_lession_time}</h4>
            <Rating star={5} />
          </div>
          <div className="couse__modal__center">
            <h5>Trẻ sẽ được học</h5>
            {benefits.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <h5>Trẻ sẽ thực hiện việc này bằng cách</h5>
            {methods.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
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
