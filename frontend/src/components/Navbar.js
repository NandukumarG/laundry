import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, UserCircle, CircleUser } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation();

  const handleContactClick = (e) => {
    if (location.pathname === "/" || location.pathname === "/HomePage") {
      // Do nothing, let the anchor tag work normally
    } else {
      e.preventDefault();
      window.location.href = "/HomePage#contact";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg container-bg bg-info-subtle">
      <div className="container">
        {/* Logo */}
        <a href="/HomePage" className="navbar-brand">
          <img src={logo} className="img-fluid logo pd-0" alt="Logo" />
        </a>

        {/* Navbar Items */}
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
                <a className="nav-link mx-lg-2" href="/HomePage">
                  Home
                </a>
              </li>

              {/* Services Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-regular btn"
                  type="button"
                  id="servicesDropdown"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                  ref={dropdownRef}
                >
                  Services
                </a>
                <ul
                  className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                  aria-labelledby="servicesDropdown"
                  ref={dropdownRef}
                >
                  <li>
                    <a
                      className="dropdown-item fw-regular"
                      href="/WashFold"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Wash & Fold
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item fw-regular"
                      href="/WashIron"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Wash & Iron
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item fw-regular"
                      href="/SteamIron"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Steam Iron
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item fw-regular"
                      href="/DryCleaning"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dry Cleaning
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="/PriceList">
                  Prices
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="/Stores">
                  Stores
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="/SchedulePickup">
                  Schedule a pickup
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link mx-lg-2"
                  href="/HomePage#contact"
                  onClick={handleContactClick}
                >
                  Contact
                </a>
              </li>
              {/* Profile Icon */}
              <li className="nav-item">
                <a href="/ProfilePage2" className="profile-icon ms-3">
                  {/* <UserCircle size={35} className="text-muted" /> */}
                  <User size={35} strokeWidth={1.5} className="text-primary" />
                  {/* <CircleUser
                    size={35}
                    strokeWidth={1.5}
                    className="text-primary"
                  /> */}
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
  );
};

export default Navbar;
