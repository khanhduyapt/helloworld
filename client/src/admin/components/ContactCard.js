import "./ContactCard.css";
import React, { useState } from "react";
import AxiosCommon from "../../components/commons/AxiosCommon";
import CardIcon from "../../components/commons/CardIcon";

function ContactCard(props) {
  console.log("contact:", props);
  const CONTACT_WAITING = "0"; //"Chờ xử lý";
  const CONTACT_DONE = "1"; //"Đã liên hệ";
  const [reply_content, set_reply_content] = useState(
    props.contact.reply_content
  );

  return (
    <div className="ContactCard">
      <div className="contactcard__client">
        <textarea
          rows="5"
          disabled
          name="reply_content"
          value={props.contact.contents}
          className="contactcard__client__content"
        />

        <div className="contactcard__field">
          <div className="contactcard__label">
            <CardIcon icon="email.png" alt="Parent" />
            Họ tên
          </div>
          <div className="contactcard__weight">{props.contact.fullname}</div>
        </div>
        <div className="contactcard__field">
          <div className="contactcard__label">
            <CardIcon icon="phone_number.png" alt="Parent" />
            SĐT
          </div>
          <div className="contactcard__weight">{props.contact.phone}</div>
        </div>

        {/* <div className="contactcard__light">{props.contact.status}</div> */}
      </div>

      <div className="contactcard__support">
        <textarea
          rows="5"
          name="reply_content"
          value={reply_content}
          className="contactcard__support__content"
          onChange={(e) => set_reply_content(e.target.value)}
          placeholder="Mong muốn của khách hàng, ghi chú khác.."
        />

        <div className="contactcard__support__controls">
          {props.contact.status !== CONTACT_DONE && (
            <input
              name="submit"
              className="card__link"
              type="submit"
              value="Đã liên hệ"
              onClick={() => {
                AxiosCommon.post(
                  `/contacts/update/${props.contact._id}`,
                  {
                    reply_content: reply_content,
                    status: CONTACT_DONE,
                  },
                  AxiosCommon.defaults.headers
                )
                  .then((res) => {
                    if (res.status === 200) {
                      props.onRegister(props.contact._id, CONTACT_WAITING);
                    } else {
                      console.log(res.data.msg);
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }}
            ></input>
          )}

          {props.contact.status === CONTACT_DONE && (
            <input
              name="submit"
              className="card__link"
              type="button"
              value="Update"
              onClick={() => {
                AxiosCommon.post(
                  `/contacts/update/${props.contact._id}`,
                  {
                    reply_content: reply_content,
                  },
                  AxiosCommon.defaults.headers
                )
                  .then((res) => {
                    if (res.status === 200) {
                    } else {
                      console.log(res.data.msg);
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }}
            ></input>
          )}

          <input
            name="submit"
            className="card__link card__link__danger"
            type="button"
            value="Xóa tin nhắn"
            onClick={() => {
              if (
                window.confirm(
                  `Bạn có muốn xóa bài viết?\n${props.contact.contents}`
                ) === true
              ) {
                AxiosCommon.delete(
                  `/contacts/${props.contact._id}`,
                  AxiosCommon.defaults.headers
                )
                  .then((res) => {
                    // console.log("delete:", res);
                    // var elem = document.getElementById(
                    //   "contact__waiting_row_" + res.data.id
                    // );
                    // elem.parentNode.removeChild(elem);

                    props.onRegister(res.data.id, CONTACT_WAITING);
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
