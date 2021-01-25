import React, { useEffect, useState } from "react";
import "./AdminMenu.css";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import FlareIcon from "@material-ui/icons/Flare";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
// import YouTubeIcon from "@material-ui/icons/YouTube";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AxiosCommon from "../../components/commons/AxiosCommon";
import { changeContactNotifyNum } from "../CommonUtil";

function AdminMenu() {
  // console.log("AdminMenu user", JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    AxiosCommon.get(`/contacts/waiting`, AxiosCommon.defaults.headers)
      .then((res) => {
        changeContactNotifyNum(res.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const history = useHistory();

  const handleMenuAtive = (e) => {
    let menuItems = document.getElementsByClassName("dbmi__active");
    if (menuItems) {
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("dbmi__active");
      }
    }

    e.target.classList.add("dbmi__active");
  };
  return (
    <div className="dashboard__menu">
      <header className="dashboard__menu__header">
        <div className="dashboard__menu__control">
          <Link
            to="/"
            className="card__link dashboard__menu__homepage"
            onClick={() => {
              history.push("/");
              window.location.reload();
            }}
          >
            <HomeIcon />
            Home page
          </Link>

          <Link
            to="/"
            className="card__link card__link__danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              history.push("/");
              window.location.reload();
            }}
          >
            Logout
            <ExitToAppIcon />
          </Link>
        </div>
        <div></div>
        <p className="dashboard__menu__user">{user && user.account}</p>{" "}
        <p className="dashboard__menu__user">{user && user.fullname}</p>
        <p className="dashboard__menu__email">{user && user.email}</p>
        <Avatar
          className="dashboard__menu__avatar"
          src={
            AxiosCommon.defaults.baseURL +
            "/images/" +
            (user && user.avatar ? user.avatar : "undefined")
          }
        ></Avatar>
      </header>

      <ul>
        <ul>
          <li className="dashboard__menu__main">Lịch học</li>
          <li>
            <Link
              to="/admin/daycalendar"
              className="dashboard__menu__item dbmi__active"
              onClick={handleMenuAtive}
            >
              <ScheduleIcon />
              Lịch học trong ngày
              <div
                id="admin_daycalendar_badge"
                className="item__badge item__badge__hide"
              ></div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/monthcalendar"
              className="dashboard__menu__item"
              onClick={handleMenuAtive}
            >
              <CalendarTodayIcon />
              Lịch học trong tháng
            </Link>
          </li>
        </ul>

        <li className="dashboard__menu__main">Liên hệ</li>
        <li>
          <Link
            to="/admin/contacts"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <ContactPhoneIcon />
            Khách hàng mới
            <div
              id="admin_contacts_badge"
              className="item__badge item__badge__hide"
            ></div>
          </Link>
        </li>
      </ul>

      <ul>
        <li className="dashboard__menu__main">Đào tạo</li>
        <li>
          <Link
            to="/admin/training"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <LocalLibraryIcon />
            Danh mục khóa học
          </Link>
        </li>
        <li>
          <Link
            to="/admin/courses"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <MenuBookIcon />
            Khóa học & học phí
          </Link>
        </li>
      </ul>

      <ul>
        <li className="dashboard__menu__main">Học viên</li>
        <li>
          <Link
            to="/admin/students"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <PeopleOutlineIcon />
            Danh sách học viên
          </Link>
        </li>
      </ul>

      <ul>
        <li className="dashboard__menu__main">Giảng viên</li>
        <li>
          <Link
            to="/admin/teachers"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <PeopleAltIcon />
            Danh sách giảng viên
          </Link>
        </li>
      </ul>

      <ul>
        <li className="dashboard__menu__main">Quản trị hệ thống</li>
        <li>
          <Link
            to="/admin/administrators"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <SupervisorAccountIcon />
            Dánh sách quản trị viên
          </Link>
        </li>
      </ul>

      {/* ==================================== */}
      <ul>
        <li className="dashboard__menu__main">Trang chủ</li>

        <li>
          <Link
            to="/admin/sliderbar"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <PhotoCameraIcon />
            Ảnh trang chủ
          </Link>
        </li>

        <li>
          <Link
            to="/admin/myspecial"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <FlareIcon />
            Điểm đặc biệt
          </Link>
        </li>

        <li>
          <Link
            to="/admin/chooseplan"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <LibraryBooksIcon />
            Khóa học nổi bật
          </Link>
        </li>

        {/* <li>
          <Link
            to="/admin/samples"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <YouTubeIcon />
            Trải nghiệm Youtube
          </Link>
        </li> */}

        <li>
          <Link
            to="/admin/vocabularies"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <LoyaltyIcon />
            Từ vựng thông dụng
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
