import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./VocabularyModal.css";
import Toast from "react-bootstrap/Toast";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";
import { Height } from "@material-ui/icons";

function VocabularyModal(props) {
  const [ToastVisible, setToastVisible] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  const category_options = ["Bài viết", "Từ vựng", "Ngữ pháp"];
  const [id, setId] = useState(props.data._id);
  const [title, setTitle] = useState(props.data.title);
  const [selectBox, setSelectBox] = useState(props.data.category_name);
  const [thumbnail, setThumbnail] = useState(props.data.thumbnail);
  const [short_content, setShortContent] = useState(props.data.short_content);
  const [contents, setContents] = useState(props.data.contents);

  const myRefname = useRef(null);

  const onSubmitForm = (data, e) => {
    e.preventDefault();
    const newdata = {
      id: id,
      title,
      thumbnail,
      short_content,
      contents,
      category_name: selectBox,
    };

    //console.log("onSubmitForm", newdata);
    axios
      .post(`http://localhost:3001/articles/update/${id}`, newdata)
      .then((res) => {
        props.onRegister(newdata);

        setToastVisible(true);
        myRefname.current.click();
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
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="vocabulary__modal">
            <div className="vocabulary__title">
              <label className="vocabulary__label">Tiêu đề bài viết:</label>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: "Nhập tiêu đề bài viết.",
                  toolbar: {
                    items: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "link",
                      "|",
                      "undo",
                      "redo",
                    ],
                  },
                  uiColor: "#66AB16",
                }}
                data={title}
                onChange={(e, editor) => setTitle(editor.getData())}
              />
            </div>

            <div className="vocabulary__modal__top">
              <div className="vocabulary__modal__top__img">
                <img src={thumbnail} alt="Thumbnail" />
              </div>

              <div className="vocabulary__modal__top__shortcontent">
                <label className="vocabulary__label">Danh mục:</label>
                <h5 className="vocabulary__modal__category">
                  <select
                    name="category_name"
                    ref={register({
                      required: "Chọn danh mục",
                    })}
                    label="Chọn danh mục"
                    className="form__input"
                    value={selectBox}
                    onChange={(e) => setSelectBox(e.target.value)}
                  >
                    {category_options.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.category_name && (
                    <p style={{ color: "red" }}>
                      {errors.category_name.message}
                    </p>
                  )}
                </h5>
                <label className="vocabulary__label">
                  Url ảnh trên internet:
                </label>
                <div className="vocabulary__modal__top__thumbnail">
                  <input
                    name="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="Url ảnh trên internet, hoặc đường dẫn trên máy tính."
                    ref={register({ required: true })}
                    className="form__input"
                  ></input>
                  {errors.full_name && (
                    <h5 className="howfree__require">Cần nhập ảnh.</h5>
                  )}
                  <button
                    type="button"
                    className="card__link"
                    onClick={(e) => setThumbnail("")}
                  >
                    Clear
                  </button>
                </div>

                <label className="vocabulary__label">
                  Giới thiệu ngắn về nội dung bài viết:
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    placeholder: "Giới thiệu ngắn về nội dung bài viết.",
                    toolbar: {
                      items: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "|",
                        "undo",
                        "redo",
                      ],
                    },
                  }}
                  data={short_content}
                  onChange={(e, editor) => setShortContent(editor.getData())}
                />
              </div>
            </div>
            <label className="vocabulary__label">Nội dung bài viết:</label>
            <div className="vocabulary__modal__center">
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: "Nội dung bài viết.",
                }}
                data={contents}
                onChange={(e, editor) => setContents(editor.getData())}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn__outline__danger"
            onClick={props.onRegister}
            type="submit"
          >
            Save
          </button>
          <button
            className="btn__outline__normal"
            onClick={props.onHide}
            ref={myRefname}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default VocabularyModal;
