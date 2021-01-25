import "./HpMenu.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { scrollIntoId } from "../admin/CommonUtil";

function HpMenu() {
  return (
    <Navbar fixed="top" collapseOnSelect expand="xl" bg="light" variant="light">
      <Container>
        <span
          className="navbar-brand"
          onClick={() => {
            scrollIntoId("carousel_slider");
          }}
        >
          Gia sư Online
        </span>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <span
              className="nav-link"
              onClick={() => {
                scrollIntoId("featured_courses");
              }}
            >
              Thông báo
            </span>

            <span
              className="nav-link"
              onClick={() => {
                scrollIntoId("education_program");
              }}
            >
              Khóa học
            </span>

            {/* <span
              className="nav-link"
              onClick={() => {
                scrollIntoId("experience_online_classes");
              }}
            >
              Trải nghiệm
            </span> */}

            <span
              className="nav-link"
              onClick={() => {
                scrollIntoId("contacts");
              }}
            >
              Liên hệ
            </span>

            <span
              className="nav-link"
              onClick={() => {
                scrollIntoId("common_vocabulary");
              }}
            >
              Từ vựng
            </span>
            <Link
              to="/admin"
              className="btn__outline__normal nav__login__button"
            >
              Vào lớp học
            </Link>

            {/* <Link to="/admin" className="nav-link">
              User: {user && user.account}
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HpMenu;
