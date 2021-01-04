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

      AxiosCommon.get(`/categories/${_id}`, AxiosCommon.defaults.headers)
        .then((res) => {
          console.log("getbyid successfully: ", res);
          if (res.status === 200) {
            setAvatarUrl(
              AxiosCommon.defaults.baseURL + "/images/" + res.data.avatar
            );

            set_title(res.data.title);
            set_slogan(res.data.slogan);
            set_action_title1(res.data.action_title1);
            set_action_body1(res.data.action_body1);
            set_action_title2(res.data.action_title2);
            set_action_body2(res.data.action_body2);
            set_action_title3(res.data.action_title3);
            set_action_body3(res.data.action_body3);
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
          }
        }
      }
    } catch (error) {}
  };

  const onSubmitForm = (data, e) => {
    e.preventDefault();

    handleUpdate(data);
  };

  const handleUpdate = (data) => {
    let formData = new FormData();
    if (data && data.avatar && data.avatar.length > 0) {
      //console.log("upload: ", data.avatar[0]);
      formData.append("img", data.avatar[0]);
    }

    formData.append("_id", _id);
    formData.append("title", title);
    formData.append("slogan", slogan);
    formData.append("action_title1", action_title1);
    formData.append("action_body1", action_body1);
    formData.append("action_title2", action_title2);
    formData.append("action_body2", action_body2);
    formData.append("action_title3", action_title3);
    formData.append("action_body3", action_body3);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let url = `/categories/add`;
    if (_id && _id !== "add") {
      url = `/categories/update/${_id}`;
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
