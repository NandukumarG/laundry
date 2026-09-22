import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.js";
import drycleanimg from "../assets/ServicesImg/drycleanimg.png";
import Yourorder from "../assets/ServicesImg/Yourorder.png";
import pickup from "../assets/ServicesImg/pickup.png";
import dryclean from "../assets/ServicesImg/dryclean.png";
import deliver from "../assets/ServicesImg/deliver.png";

function DryCleaning() {
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
                Dry Cleaning
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "regular",
                  textAlign: "left",
                }}
              >
                An heirloom silk saree. A light-as-air chiffon dupatta.
                Intricately beaded and embroidered kurtas. Formal three-piece
                suits. Warm winter woollens. Surely, they deserve only the best
                of care while dry-cleaning? We are well aware of this: you’re
                not just placing orders for garments here… you’re placing your
                trust in us as well.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="col-md-6 text-center">
              <img
                src={drycleanimg}
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
          padding: "60px 0px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Our Process</h2>
        <p style={{ fontWeight: "semibold" }}>
          (Smoooooth, from start to finish.)
        </p>
        <p style={{ fontWeight: "semibold" }}>
          A dry cleaning service that delivers in 24 hours is now super easy to
          find! All it takes is a few minutes of your time.
        </p>
        <div className="container p-5">
          <div className="row text-center p-3">
            <div className="col-md-3">
              <img src={Yourorder} alt="Order" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                Your Order
              </h4>
              <p>
                It’s as easy as a few clicks. On the app, select the dry
                cleaning option, scroll and choose from the list of apparel
                categories, add the number of pieces against them and place your
                order.
              </p>
            </div>
            <div className="col-md-3">
              <img src={pickup} alt="Pick up" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                We pick up
              </h4>
              <p>
                The next thing you know, our associate is at your doorstep,
                bagging your items and rushing them in our 100% electric vans to
                our premises.
              </p>
            </div>
            <div className="col-md-3">
              <img src={dryclean} alt="Dry Clean" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                We dry clean
              </h4>
              <p>
                Our world-class facility swings into operation, giving your
                valuable order the attention, care and expertise it deserves.
              </p>
            </div>
            <div className="col-md-3">
              <img src={deliver} alt="Delivery" width="130" />
              <h4 className="p-3" style={{ fontWeight: "bold" }}>
                We deliver
              </h4>
              <p>
                The very next day, the doorbell rings again and you have your
                freshly dry-cleaned outfits back in 100% no-plastic packaging,
                carefully protected and wardrobe ready.
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

export default DryCleaning;
