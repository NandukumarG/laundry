import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.js";
import warmup from "../assets/ServicesImg/warmup.png";
import pickup from "../assets/ServicesImg/pickup.png";
import dryclean from "../assets/ServicesImg/dryclean.png";
import deliver from "../assets/ServicesImg/deliver.png";
import steamiron from "../assets/ServicesImg/steamiron.png";

function SteamIron() {
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
                Steam Iron
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "semibold",
                  textAlign: "left",
                }}
              >
                A wrinkled business shirt. A crumpled dress. A badly creased
                pair of trousers. A crushed uniform. A crinkled scarf. Oh-oh, if
                this lot is oddly familiar, strike while the iron is hot. We
                know what it means: you’re not looking for well-pressed
                garments… you’re ironing out the stresses of the day.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="col-md-6 text-center">
              <img
                src={steamiron}
                alt="Mom's helper"
                className="img-fluid"
                style={{ width: "80%", height: "500px" }}
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
        <p style={{ fontWeight: "bold" }}>(Full steam ahead, you could say.)</p>
        <p style={{ fontWeight: "semibold" }}>
          A steam iron service that delivers in 24 hours is now super easy to
          find! All it takes is a few minutes of your time.
        </p>
        <div className="container p-5">
          <div className="row text-center p-3">
            <div className="col-md-3">
              <img src={warmup} alt="Order" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Warm up
              </h4>
              <p>
                Get started on your order. Select the steam iron option, scroll
                through the list of apparel categories, choose the ones relevant
                to your load and add the number of pieces against them – then
                hit the order button.
              </p>
            </div>
            <div className="col-md-3">
              <img src={pickup} alt="Pick up" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Pick up
              </h4>
              <p>
                Our associate will hop into our 100% electric van and be at your
                doorstep to bag your clothes before heading off to our premises.
              </p>
            </div>
            <div className="col-md-3">
              <img src={dryclean} alt="Dry Clean" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Steam up
              </h4>
              <p>
                Our world-class facility hots up with the action, where
                hi-powered steam irons get to work with perfect temperature
                control and precision.
              </p>
            </div>
            <div className="col-md-3">
              <img src={deliver} alt="Delivery" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Show
              </h4>
              <p>
                Our associate returns the next day carrying 100% no-plastic
                packaging with your impeccably pressed ready-to-wear attire.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default SteamIron;
