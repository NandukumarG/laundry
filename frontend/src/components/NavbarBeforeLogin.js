import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./nav.css";
import logo from "../assets/logo.png";

const NavbarBeforeLogin = () => {
  return (
    <div className="nav-bg">
      <nav className="navbar navbar-expand-lg container-bg bg-info-subtle">
        <div className="container">
          {/* Logo */}
          <a href="/GetStarted" className="navbar-brand">
            <img src={logo} className="img-fluid logo pd-0" alt="Logo" />
          </a>

          {/* Navbar links */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <a href="/GetStarted" className="navbar-brand">
                  <img src={logo} className="img-fluid logo pd-0" alt="Logo" />
                </a>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#hero">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#service">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#first-order">
                    Schedule a pickup
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="navbar-toggler pe-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavbarBeforeLogin;
