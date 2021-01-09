import "./HpMenu.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function HpMenu() {
  return (
    <Navbar fixed="top" collapseOnSelect expand="xl" bg="light" variant="light">
      <Container>
        <Link to="/" className="navbar-brand">
          React-Bootstrap
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Link to="/features" className="nav-link">
              Features
            </Link>

            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link to="/deets" className="nav-link">
              More deets
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>

            {/* <Link to="/admin" className="nav-link">
              User: {user && user.account}
            </Link> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <span
          className="nav-link card__link__danger"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }}
        >
          Logout
        </span>
      </Container>
    </Navbar>
  );
}

export default HpMenu;
