import "./Login.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardIcon from "./commons/CardIcon";
import RequiredIcon from "./commons/RequiredIcon";
import AxiosCommon from "./commons/AxiosCommon";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [account, set_account] = useState("");
  const [password, set_password] = useState("");
  const [server_message, set_server_message] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    const formData = { username: account, password: password };

    AxiosCommon.post(`/ulogin`, formData)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.auth) {
            console.log("res.data.user", res.data.user);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            history.push("/admin");
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            set_server_message("・" + res.data.msg);
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          set_server_message("・" + res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    //----------------------
  };

  return (
    <div className="login__form">
      <div className="login__msg">
        <ul>
          <li>{server_message}</li>
          <li></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <div className="login__field">
          <div className="login__label">
            <CardIcon icon="account.jpg" alt="Tài khoản" />
            Tài khoản
          </div>

          <input
            name="account"
            value={account}
            ref={register({
              required: true,
            })}
            onChange={(e) => set_account(e.target.value)}
            className="login__item"
            placeholder="Tài khoản đăng nhập"
          />
          <RequiredIcon />
        </div>

        <div className="login__field">
          <div className="login__label">
            <CardIcon icon="password.jpg" alt="birthday" />
            Mật khẩu
          </div>

          <input
            name="password"
            type="password"
            value={password}
            ref={register({
              required: true,
            })}
            onChange={(e) => set_password(e.target.value)}
            className="login__item"
            placeholder="Mật khẩu đăng nhập"
          />
          <RequiredIcon />
        </div>
        <div className="login__buttons">
          <input
            name="submit"
            className="card__link"
            type="submit"
            value={"Login"}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Login;
