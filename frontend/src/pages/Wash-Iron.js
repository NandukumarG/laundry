import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import WashIronImg from "../assets/ServicesImg/washIron.png";
import washIronJustClickImg from "../assets/ServicesImg/wash-iron-justaClick.png";
import pickup from "../assets/ServicesImg/pickup.png";
import washIronNowThatsSlickImg from "../assets/ServicesImg/wash-iron-nowThatsSlick.png";
import deliver from "../assets/ServicesImg/deliver.png";

const WashIron = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero section */}
      <section className="hero-section container-fluid py-5 bg-info-subtle">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side: Text Content */}
            <div className="col-md-6">
              <h1
                style={{
                  fontWeight: "bold",
                  marginBottom: "30px",
                  textAlign: "left",
                }}
              >
                Wash & Iron
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "semibold",
                  textAlign: "left",
                }}
              >
                Office wear shirt. Evening wear salwar kameez. Daily wear
                pyjamas. Sportswear sweat pants. Holiday wear bermudas. Hmm,
                that's a time, energy and space consuming list if you ever saw
                one. We can confidently say this: you're not just arranging for
                a laundry service now … you're rearranging your day and life.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="col-md-6 text-center">
              <img
                src={WashIronImg}
                alt="Iron"
                className="img-fluid"
                style={{ width: "75%", height: "450px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <div
        className="process-section"
        style={{
          backgroundColor: "#F8F9FA",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Our Process</h2>
        <p style={{ fontWeight: "semibold" }}>
          (What makes us tick, tick, tick…)
        </p>
        <p style={{ fontWeight: "semibold" }}>
          A wash and iron service online that delivers in 24 hours is not an
          unreasonable ask! It can be done in a few quick clicks.
        </p>
        <div className="container p-5">
          <div className="row text-center p-3">
            <div className="col-md-3">
              <img src={washIronJustClickImg} alt="Order" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Just a Click
              </h4>
              <p>
                It's absurdly simple. Select the wash and iron option on the
                app, scroll down and pick the apparel categories that match your
                load, add the number of pieces against each of them and order -
                that's it.
              </p>
            </div>
            <div className="col-md-3">
              <img src={pickup} alt="Pick up" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Ready to pick
              </h4>
              <p>
                Our associate will be at your doorstep, after a speedy ride to
                pick up and bag your items and head right back to our premises.
              </p>
            </div>
            <div className="col-md-3">
              <img src={washIronNowThatsSlickImg} alt="Dry Clean" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Now that's slick
              </h4>
              <p>
                At our world-class facility, the smooth process begins, for
                washing, drying and ironing, all keeping hygiene, precision and
                care in mind.
              </p>
            </div>
            <div className="col-md-3">
              <img src={deliver} alt="Delivery" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Isn't that quick
              </h4>
              <p>
                And our associate then heads back to your door, bearing 100%
                no-plastic packaging stacked with fresh, clean and crisply
                ironed clothes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default WashIron;
