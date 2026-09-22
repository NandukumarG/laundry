import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import WashFoldImg from "../assets/ServicesImg/washFold.png";
import WashFoldFirstStepImg from "../assets/ServicesImg/wash-fold-firstStep.png";
import pickup from "../assets/ServicesImg/pickup.png";
import WashFoldNextStepImg from "../assets/ServicesImg/wash-fold-nextStep.png";
import deliver from "../assets/ServicesImg/deliver.png";

const WashFold = () => {
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
                Wash & Fold
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "regular",
                  textAlign: "left",
                }}
              >
                A whiter-than-white shirt. A crisp cotton saree. A well-worn
                pair of rugged jeans. King-sized bed linen. Monday-to-Friday
                socks. Well, this load is going to need high levels of hygiene
                and cleanliness – and also a challenging amount of compact
                folding.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="col-md-6 text-center">
              <img
                src={WashFoldImg}
                alt="Mom's helper"
                className="img-fluid"
                style={{ width: "100%", height: "450px" }}
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
          (Just four steps to laundry freedom.)
        </p>
        <p style={{ fontWeight: "semibold" }}>
          A wash and fold service that delivers in 24 hours is now super easy to
          find! All it takes is a few minutes of your time.
        </p>
        <div className="container p-5">
          <div className="row text-center p-3">
            <div className="col-md-3">
              <img src={WashFoldFirstStepImg} alt="Order" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                First Step
              </h4>
              <p>
                Open the application and get started. Select the wash and fold
                option, then scroll through the handy list, choose the right
                category of apparel and add the number of pieces against them –
                order and forget about it.
              </p>
            </div>
            <div className="col-md-3">
              <img src={pickup} alt="Pick up" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Door Step
              </h4>
              <p>
                It's our turn now. Our associate comes right to your door, picks
                up your clothes, packs them in bags and whisks them away in our
                100% electric van.
              </p>
            </div>
            <div className="col-md-3">
              <img src={WashFoldNextStepImg} alt="Dry Clean" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Next Step
              </h4>
              <p>
                Your clothes now get into our world-class facility, where
                hygiene and quality are intrinsic to the washing, expert
                handling and neatness go into the folding.
              </p>
            </div>
            <div className="col-md-3">
              <img src={deliver} alt="Delivery" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Door Step
              </h4>
              <p>
                And back to your door comes your clean, fresh, neatly folded
                laundry the very next day delivered in 100% no-plastic
                packaging.
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

export default WashFold;
