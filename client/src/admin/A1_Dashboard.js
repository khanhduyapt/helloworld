import { Avatar } from "@material-ui/core";
import React from "react";
import "./A1_Dashboard.css";
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

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function A1_Dashboard() {
  return (
    <BrowserRouter>
      <div className="dashboard">
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
            <li className="dashboard__menu__main">Contacts</li>
            <li>
              <Link to="/admin/contacts" className="dashboard__menu__item">
                <ContactPhoneIcon />
                Khách hàng gửi yêu cầu
                <div className="item__badge">25</div>
              </Link>
            </li>
          </ul>

          <ul>
            <li className="dashboard__menu__main">Giảng viên</li>
            <li>
              <Link to="/admin/teachers" className="dashboard__menu__item">
                <PeopleAltIcon />
                Danh sách giảng viên
              </Link>
            </li>
          </ul>

          <ul>
            <li className="dashboard__menu__main">Học viên</li>
            <li>
              <a href="#" className="dashboard__menu__item">
                <PeopleOutlineIcon />
                Danh sách học viên
              </a>
            </li>
          </ul>

          <ul>
            <li className="dashboard__menu__main">Quản trị hệ thống</li>
            <li>
              <a href="#" className="dashboard__menu__item">
                <SupervisorAccountIcon />
                Dánh sách quản trị viên
              </a>
            </li>
          </ul>

          {/* ==================================== */}
          <ul>
            <li className="dashboard__menu__main">Trang chủ</li>

            <li>
              <a href="#" className="dashboard__menu__item dbmi__active">
                <PhotoCameraIcon />
                Ảnh trang chủ
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <FlareIcon />
                Điểm đặc biệt
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <LocalGroceryStoreIcon />
                Tại sao chọn chúng tôi
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <LocalLibraryIcon />
                Chương trình đào tạo
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <LibraryBooksIcon />
                Các khóa học nổi bật
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <YouTubeIcon />
                Lớp học mẫu
              </a>
            </li>

            <li>
              <a href="#" className="dashboard__menu__item">
                <LoyaltyIcon />
                Từ vựng thông dụng
              </a>
            </li>
          </ul>
        </div>
        <div className="dashboard__content">
          <Switch>
            <Route path="/admin/contacts">
              <h1>Admin contacts</h1>
            </Route>

            <Route path="/admin/teachers">
              <h1>Admin teachers</h1>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default A1_Dashboard;
