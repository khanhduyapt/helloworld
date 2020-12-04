import { Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./VocabularyModal.css";
import Toast from "react-bootstrap/Toast";
import { useForm } from "react-hook-form";
import axios from "axios";

function VocabularyModal(props) {
  const [ToastVisible, setToastVisible] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const myRefname = useRef(null);

  const onSubmitForm = (data, e) => {
    e.preventDefault();
    const newdata = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      short_content: data.short_content,
      contents: data.contents,
      category_name: data.category_name,
    };
    axios
      .post(`http://localhost:3001/api/article`, newdata)
      .then((res) => {
        props.onRegister(newdata);

        setToastVisible(true);
        setTimeout(function () {
          myRefname.current.click();
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Modal
      {...props}
      animation={false}
      dialogClassName="vocabulary__modal"
      centered
    >
      <Toast
        className="vocabulary__modal__toast"
        onClose={() => setToastVisible(false)}
        show={ToastVisible}
        delay={2000}
        animation={true}
        autohide
      >
        <Toast.Body className="alert-success">
          <h5>Đã lưu thông tin vào cơ sở dữ liệu.</h5>
        </Toast.Body>
      </Toast>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title className="vocabulary__title">
            <input
              type="hidden"
              name="id"
              value={props.data.id}
              ref={register}
            />
            <input
              name="title"
              defaultValue={props.data.title}
              placeholder="Nhập tiêu đề bài viết."
              ref={register({ required: true })}
              className="form__input"
            ></input>
            {errors.title && (
              <h5 className="howfree__require">Cần nhập tiêu đề bài viết.</h5>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="vocabulary__modal">
            <div className="vocabulary__modal__top">
              <div className="vocabulary__modal__top__img">
                <img src={props.data.thumbnail} alt={props.data.title} />
              </div>

              <div className="vocabulary__modal__top__shortcontent">
                <h5 className="vocabulary__modal__category">
                  {props.data.category_name}
                </h5>

                <textarea
                  name="short_content"
                  defaultValue={props.data.short_content}
                  placeholder="Giới thiệu ngắn về nội dung bài viết."
                  ref={register({ required: true })}
                  rows="5"
                  className="form__input"
                />

                <div className="vocabulary__modal__top__thumbnail">
                  <input
                    name="thumbnail"
                    defaultValue={props.data.thumbnail}
                    placeholder="Url ảnh trên internet, hoặc đường dẫn trên máy tính."
                    ref={register({ required: true })}
                    className="form__input"
                  ></input>
                  {errors.full_name && (
                    <h5 className="howfree__require">Cần nhập tên của bạn.</h5>
                  )}
                  <Button>Browser</Button>
                </div>
              </div>
            </div>
            <div className="vocabulary__modal__center">
              <textarea
                name="contents"
                defaultValue={props.data.contents}
                placeholder="Nội dung bài viết."
                ref={register({ required: true })}
                rows="15"
                className="form__input"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onRegister} type="submit">
            Save
          </Button>
          <Button onClick={props.onHide} ref={myRefname}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default VocabularyModal;
