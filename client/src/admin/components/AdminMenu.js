import React from "react";
import "./AdminMenu.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import FlareIcon from "@material-ui/icons/Flare";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

function AdminMenu() {
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
        <p className="dashboard__menu__user">username</p>
        <p className="dashboard__menu__email">username@gmail.com</p>
        <Avatar
          className="dashboard__menu__avatar"
          src="http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg"
        ></Avatar>
      </header>

      <ul>
        <ul>
          <li className="dashboard__menu__main">Lịch học</li>
          <li>
            <Link
              to="/admin/daycalendar"
              className="dashboard__menu__item"
              onClick={handleMenuAtive}
            >
              <ScheduleIcon />
              Lịch học trong ngày
              <div id="admin_daycalendar_badge" className="item__badge">
                2
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/weekcalendar"
              className="dashboard__menu__item"
              onClick={handleMenuAtive}
            >
              <DateRangeIcon />
              Lịch học trong tuần
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

        <li className="dashboard__menu__main">Contacts</li>
        <li>
          <Link
            to="/admin/contacts"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <ContactPhoneIcon />
            Khách hàng mới
            <div id="admin_contacts_badge" className="item__badge">
              25
            </div>
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
            to="/admin/admins"
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
            to="/admin/satisfact"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <LocalLibraryIcon />
            Chương trình đào tạo
          </Link>
        </li>

        <li>
          <Link
            to="/admin/chooseplan"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <LibraryBooksIcon />
            Các khóa học nổi bật
          </Link>
        </li>

        <li>
          <Link
            to="/admin/samples"
            className="dashboard__menu__item"
            onClick={handleMenuAtive}
          >
            <YouTubeIcon />
            Lớp học mẫu
          </Link>
        </li>

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
