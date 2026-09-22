import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-4">
            <img src={logo} alt="logo" />
            <p>
              <br></br>We have been dedicated to providing high-quality<br></br>{" "}
              laundry services since 2024.
            </p>
          </div>
          <div className="col-md-2 mt-4 Footer-order">
            <h5>Menu</h5>
            <ul className="list-unstyled mt-4">
              <li>
                <a href="/HomePage" className="text-lght">
                  Home
                </a>
              </li>
              <li>
                <a href="#service" className="text-lght">
                  Services
                </a>
              </li>
              <li>
                <a href="/PriceList" className="text-lght">
                  Prices
                </a>
              </li>
              <li>
                <a href="/Stores" className="text-lght">
                  Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-lght">
                  Schedule a pickup
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mt-4 Footer-order">
            <h5>Services</h5>
            <ul className="list-unstyled mt-4">
              <li>
                <a href="#" className="text-lght">
                  Wash and Fold
                </a>
              </li>
              <li>
                <a href="#" className="text-lght">
                  Wash and Iron
                </a>
              </li>
              <li>
                <a href="/SteamIron" className="text-lght">
                  Steam Iron
                </a>
              </li>
              <li>
                <a href="/DryCleaning" className="text-lght">
                  Dry Cleaning
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mt-4 Footer-order">
            <h5>About</h5>
            <ul className="list-unstyled mt-4">
              <li>
                <a href="#contact" className="text-lght">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-lght">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-lght">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 mt-4 Footer-order">
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-lght">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-lght">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-lght">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-lght">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 copyright">
          <p className="mb-0">© COPYRIGHT 2024 | BACHELOR'S DHOBI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
