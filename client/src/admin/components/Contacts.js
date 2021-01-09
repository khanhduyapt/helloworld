import "./Contacts.css";
import React, { useEffect, useState } from "react";
import AxiosCommon from "../../components/commons/AxiosCommon";
import ContactCard from "./ContactCard";
import { arrayRemove, changeContactNotifyNum } from "../CommonUtil";

function Contacts() {
  const [ContactList, setContactList] = useState([]);
  const [DoneList, setDoneList] = useState([]);
  const CONTACT_WAITING = "0"; //"Chờ xử lý";
  const [RegitedList, setRegitedList] = useState([]);

  useEffect(() => {
    AxiosCommon.get(`/contacts/waiting`, AxiosCommon.defaults.headers)
      .then((res) => {
        setContactList(() => {
          return [...res.data];
        });

        changeContactNotifyNum(res.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });

    AxiosCommon.get(`/contacts/done`, AxiosCommon.defaults.headers)
      .then((res) => {
        setDoneList(() => {
          return [...res.data];
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [RegitedList]);

  const handleRegistData = (regitsId, status) => {
    if (status === CONTACT_WAITING) {
      setRegitedList((pre) => {
        return [...pre, regitsId];
      });
    } else {
      setRegitedList((pre) => {
        return arrayRemove(...pre, regitsId);
      });
    }
  };

  return (
    <div className="Contacts">
      <div className="contact__waiting">
        <div className="contact__header">Danh sách liên hệ của khách hàng</div>
        {ContactList.map((contact) => {
          return (
            <div
              key={`contact__waiting_row_${contact._id}`}
              id={`contact__waiting_row_${contact._id}`}
              className="contact__row"
            >
              <ContactCard contact={contact} onRegister={handleRegistData} />
            </div>
          );
        })}
      </div>
      <div className="contact__done">
        <div className="contact__header">Danh sách đã trả lời khách hàng</div>
        {DoneList.map((contact) => {
          return (
            <div
              key={`contact__waiting_row_${contact._id}`}
              id={`contact__waiting_row_${contact._id}`}
              className="contact__row"
            >
              <ContactCard contact={contact} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Contacts;
