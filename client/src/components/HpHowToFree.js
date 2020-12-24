import React, { useEffect, useState } from "react";
import "./HpHowToFree.css";
import { useForm } from "react-hook-form";
import Toast from "react-bootstrap/Toast";
import AOS from "aos";
import "aos/dist/aos.css";

function HpHowToFree() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  const [show, setShow] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setShow(true);
    reset();
  };
  //console.log(watch("full_name")); // watch input value by passing the name of it

  return (
    <div className="howfree__bg" id="contacts">
      <div className="howfree">
        <Toast
          className="howfree__toast"
          onClose={() => setShow(false)}
          show={show}
          delay={10000}
          animation={true}
          autohide
        >
          <Toast.Body className="alert-success">
            <h5>
              Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ trong thời gian
              sớm nhất có thể.
            </h5>
          </Toast.Body>
        </Toast>
        <h2
          className="form-title"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          Liên hệ với giáo viên
        </h2>

        <div
          className="howfree__container"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="full_name"
              className="howfree__input"
              placeholder="Nhập tên của bạn"
              ref={register({ required: true })}
            />
            {errors.full_name && (
              <h5 className="howfree__require">Cần nhập tên của bạn.</h5>
            )}

            <input
              type="tel"
              className="howfree__input"
              name="phone_number"
              placeholder="Số điện thoại của bạn"
              ref={register({ required: true })}
            />
            {errors.phone_number && (
              <h5 className="howfree__require">
                Cần nhập số điện thoại liên hệ.
              </h5>
            )}

            <textarea
              className="howfree__input"
              name="msg_detail"
              rows="5"
              placeholder="Tin nhắn chi tiết. &#10;Thời gian chích hợp để liên hệ với bạn."
              ref={register}
            />
            <button className="howfree__submit" type="submit">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HpHowToFree;