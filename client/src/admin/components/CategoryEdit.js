import "./CategoryEdit.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { Alert } from "bootstrap";
import CardIcon from "../../components/commons/CardIcon";
import RequiredIcon from "../../components/commons/RequiredIcon";
import { objToStr } from "../CommonUtil";

function CategoryEdit(props) {
  //console.log(props);

  const { register, handleSubmit, errors } = useForm();
  const [avatarPath, setAvatarPath] = useState("");
  const [_id, setId] = useState("");

  const [account, set_account] = useState("");
  const [password, set_password] = useState("");
  const [address, set_address] = useState("");
  const [avatar, set_avatar] = useState("");
  const [date_join, set_date_join] = useState("");
  const [date_of_birth, set_date_of_birth] = useState(new Date());
  const [email, set_email] = useState("");
  const [facebook, set_facebook] = useState("");
  const [fullname, set_fullname] = useState("");
  const [local_id, set_local_id] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [skype_id, set_skype_id] = useState("");
  const [zoom_id, set_zoom_id] = useState("");
  const [user_notes, set_user_notes] = useState("");

  const refBackLink = useRef(null);
  const [isAddNew, setIsAddNew] = useState(true);

  const [title, set_title] = useState("");
  const [slogan, set_slogan] = useState("");
  const [action_title1, set_action_title1] = useState("");
  const [action_body1, set_action_body1] = useState("");
  const [action_title2, set_action_title2] = useState("");
  const [action_body2, set_action_body2] = useState("");
  const [action_title3, set_action_title3] = useState("");
  const [action_body3, set_action_body3] = useState("");

  const [server_message, set_server_message] = useState("");

  //src={AxiosCommon.defaults.baseURL + "/images/" + student.avatar}
  const [avatarUrl, setAvatarUrl] = useState(
    AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
  );

  useEffect(() => {
    const _id = props.match.params.id;
    setId(_id);

    if (_id && _id !== "add") {
      setIsAddNew(false);

      AxiosCommon.get(`/user/admins/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setAvatarUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_account(res.data.account);
            set_password(res.data.password);
            set_address(res.data.address);
            set_avatar(res.data.avatar);
            set_date_join(res.data.date_join);
            set_date_of_birth(new Date(res.data.date_of_birth));
            set_email(res.data.email);
            set_facebook(res.data.facebook);
            set_fullname(res.data.fullname);
            set_local_id(res.data.local_id);
            set_phone_number(res.data.phone_number);
            set_skype_id(res.data.skype_id);
            set_zoom_id(res.data.zoom_id);
            set_user_notes(objToStr(res.data.user_notes));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props.match.params.id]);

  const handleChangeImage = (e) => {
    try {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        if (file.size > 5000000) Alert("File size cannot exceed more than 5Mb");
        else {
          console.log("File:", e.target.value);
          setAvatarPath(e.target.value);

          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatarUrl(reader.result);
          };

          if (file) {
            reader.readAsDataURL(file);
            setAvatarUrl(reader.result);

            set_avatar(file.name);
          }
        }
      }
    } catch (error) {}
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    AxiosCommon.get(
      `/user/check/${account}/${_id}`,
      AxiosCommon.defaults.headers
    ).then((res) => {
      if (res.status !== 200) {
        set_server_message("・" + res.data.msg);
      } else {
        handleUpdate(data);
      }
    });
  };

  const handleUpdate = (data) => {
    let formData = new FormData();
    if (data && data.avatar && data.avatar.length > 0) {
      //console.log("upload: ", data.avatar[0]);
      formData.append("img", data.avatar[0]);
    }

    formData.append("_id", _id);
    formData.append("account", account);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("avatar", avatar);
    formData.append("date_join", date_join);
    formData.append("date_of_birth", date_of_birth);
    formData.append("email", email);
    formData.append("facebook", facebook);
    formData.append("fullname", fullname);
    formData.append("local_id", local_id);
    formData.append("phone_number", phone_number);
    formData.append("skype_id", skype_id);
    formData.append("zoom_id", zoom_id);
    formData.append("user_notes", user_notes);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let url = `/user/admins/add`;
    if (_id && _id !== "add") {
      url = `/user/admins/update/${_id}`;
    }

    AxiosCommon.post(url, formData, config)
      .then((res) => {
        //console.log("update user successfully: ", res);
        if (res.status === 200) {
          refBackLink.current.click();
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    //----------------------
  };

  return (
    <div className="admin__edit">
      {isAddNew && (
        <h1 className="dashboard__header">Thêm mới Danh mục đào tạo</h1>
      )}
      {!isAddNew && (
        <h1 className="dashboard__header">Chỉnh sửa Danh mục đào tạo</h1>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
        className="admin__edit__form"
      >
        <div className="admin__image__chooser">
          <input
            name="avatar"
            value={avatarPath}
            onChange={handleChangeImage}
            ref={register}
            type="file"
            accept="image/*"
            className="admin__image__choosefile"
          />
        </div>
        <div className="admin__image__chooser">
          <div className="category__edit__label">
            <CardIcon icon="address.png" alt="full name" />
            Ảnh đại diện
          </div>
          <img src={avatarUrl} alt=""></img>

          <button
            type="button"
            className="card__link upload__image__clear"
            onClick={() => {
              console.log("Xóa");
              setAvatarPath("");
              setAvatarUrl(
                AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
              );
            }}
          >
            Xóa
          </button>

          <div className="admin__error__msg">
            <ul>
              {errors.fullname && <li>・{errors.fullname.message}</li>}
              {errors.account && <li>・{errors.account.message}</li>}
              {errors.password && <li>・{errors.password.message}</li>}
              {errors.phone_number && <li>・{errors.phone_number.message}</li>}
              <li>{server_message}</li>
              <li> </li>
            </ul>
          </div>
        </div>

        <div className="admin__edit__info">
          <div className="admin__edit__infoMain">
            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Danh mục đào tạo
              </div>
              <input
                name="title"
                value={title}
                ref={register({
                  required: "Cần nhập「Danh mục đào tạo」",
                })}
                className="admin__input__content"
                onChange={(e) => set_title(e.target.value)}
                placeholder="Chương trình đào tạo"
              />
              <RequiredIcon />
            </div>

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Phương châm
              </div>
              <input
                name="slogan"
                value={slogan}
                className="admin__input__content"
                onChange={(e) => set_slogan(e.target.value)}
                placeholder="Phương châm"
              />
            </div>
          </div>
        </div>

        <br />
        <div className="admin__image__chooser">
          <input
            name="avatar"
            value={avatarPath}
            onChange={handleChangeImage}
            ref={register}
            type="file"
            accept="image/*"
            className="admin__image__choosefile"
          />
        </div>
        <div className="admin__image__chooser">
          <div className="category__edit__label">
            <CardIcon icon="address.png" alt="full name" />
            Ảnh nền hoạt động
          </div>
          <img src={avatarUrl} alt=""></img>

          <button
            type="button"
            className="card__link upload__image__clear"
            onClick={() => {
              console.log("Xóa");
              setAvatarPath("");
              setAvatarUrl(
                AxiosCommon.defaults.baseURL + "/images/noimage.jpg"
              );
            }}
          >
            Xóa
          </button>
        </div>
        <div className="admin__edit__info">
          <div className="admin__edit__infoMain">
            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Hoạt động 1
              </div>
              <input
                name="action_title1"
                value={action_title1}
                className="admin__input__content"
                onChange={(e) => set_action_title1(e.target.value)}
                placeholder="Hoạt động 1"
              />
            </div>

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Mục đích
              </div>
              <textarea
                rows="3"
                name="action_body1"
                value={action_body1}
                className="admin__input__content"
                onChange={(e) => set_action_body1(e.target.value)}
                placeholder="Mục đích của hoạt động 1"
              />
            </div>

            <br />

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Hoạt động 2
              </div>
              <input
                name="action_title2"
                value={action_title2}
                className="admin__input__content"
                onChange={(e) => set_action_title2(e.target.value)}
                placeholder="Hoạt động 2"
              />
            </div>

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Mục đích
              </div>
              <textarea
                rows="3"
                name="action_body2"
                value={action_body2}
                className="admin__input__content"
                onChange={(e) => set_action_body2(e.target.value)}
                placeholder="Mục đích của hoạt động 2"
              />
            </div>
            <br />

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Hoạt động 3
              </div>
              <input
                name="action_title3"
                value={action_title3}
                className="admin__input__content"
                onChange={(e) => set_action_title3(e.target.value)}
                placeholder="Hoạt động 3"
              />
            </div>

            <div className="category__edit__row">
              <div className="category__edit__label">
                <CardIcon icon="address.png" alt="full name" />
                Mục đích
              </div>
              <textarea
                rows="3"
                name="action_body3"
                value={action_body3}
                className="admin__input__content"
                onChange={(e) => set_action_body3(e.target.value)}
                placeholder="Mục đích của hoạt động 3"
              />
            </div>
            {/* end */}
          </div>

          <div className="admin__edit__buttons">
            <Link
              className="card__link hor__center"
              ref={refBackLink}
              to="/admin/training"
            >
              List
            </Link>

            <input
              name="submit"
              className="card__link card__link__danger"
              type="submit"
              value={isAddNew ? "Create" : "Update"}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;
