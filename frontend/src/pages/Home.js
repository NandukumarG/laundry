import React, { useState, useEffect, useRef } from "react";
import axios from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.js";

import heroLogo from "../assets/hero-bg.png";

import washFold from "../assets/wash-fold.png";
import washIron from "../assets/wash-iron.png";
import steamIron from "../assets/steam-iron.png";
import dryClean from "../assets/dry-clean.png";

import aboutImg from "../assets/about-img.png";
import li1Img from "../assets/li-1.png";
import li2Img from "../assets/li-2.png";
import li3Img from "../assets/li-3.png";

import manIronImg from "../assets/man-ironing.png";
import foldedClothesImg from "../assets/folded-clothes.png";
import foli1Img from "../assets/fo-li1.png";
import foli2Img from "../assets/fo-li2.png";
import foli3Img from "../assets/fo-li3.png";

import whyHygienicImg from "../assets/why-hygiene-img.png";
import whyAssuranceImg from "../assets/why-assurance-img.png";
import whyWeighingScaleImg from "../assets/why-weighing-img.png";
import whyDeliveryImg from "../assets/why-delivery-img.png";
import whyPaymentImg from "../assets/why-payment-img.png";

import testimonialYingLiImg from "../assets/testimonial-yingli-img.png";
import testimonialSarahWilliamsImg from "../assets/testimonial-sarahwilliams-img.png";
import testimonialEmilyRobertsImg from "../assets/testimonial-emilyroberts-img.png";
import testimonialJohnDoeImg from "../assets/testimonial-johndoe-img.png";

import malleshwaramStoreImg from "../assets/malleshwaram-store.png";
import bellandurStoreImg from "../assets/bellandur-store.png";
import rrNagarStoreImg from "../assets/rr-nagar-store.png";
import krPuramStoreImg from "../assets/kr-puram-store.png";

import tideLogo from "../assets/tide-logo.png";
import arielLogo from "../assets/ariel-logo.png";
import comfortLogo from "../assets/comfort-logo.png";
import surfExcelLogo from "../assets/surf-excel-logo.png";
import vanishLogo from "../assets/vanish-logo.png";
import downyLogo from "../assets/downy-logo.png";
import wooliteLogo from "../assets/woolite-logo.png";
import oxicleanLogo from "../assets/oxiclean-logo.png";
import voltasLogo from "../assets/voltas-logo.png";
import whirlpoolLogo from "../assets/whirlpool-logo.png";
import samsungLogo from "../assets/samsung-logo.png";
import philipsLogo from "../assets/philips-logo.png";
import lgLogo from "../assets/lg-logo.png";
import godrejLogo from "../assets/godrej-logo.png";
import boschLogo from "../assets/bosch-logo.png";

import "./Home.css";

const HomePage = () => {
  const sliderRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact/submit", formData);
      toast.success("Form submitted successfully!", { position: "top-right" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error submitting the form. Please try again.", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    // Only apply this if user is already logged in and shouldn't go back
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      window.history.replaceState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.replaceState(null, "", window.location.href);
      };

      return () => {
        window.onpopstate = null; // Clean up when component unmounts
      };
    }
  }, []);

  const trustedBrands = [
    { id: 1, name: "Tide", image: tideLogo },
    { id: 2, name: "Bosch", image: boschLogo },
    { id: 3, name: "Ariel", image: arielLogo },
    { id: 4, name: "Voltas", image: voltasLogo },
    { id: 5, name: "Comfort", image: comfortLogo },
    { id: 6, name: "Surf Excel", image: surfExcelLogo },
    { id: 7, name: "Whirlpool", image: whirlpoolLogo },
    { id: 8, name: "Vanish", image: vanishLogo },
    { id: 9, name: "Godrej", image: godrejLogo },
    { id: 10, name: "Downy", image: downyLogo },
    { id: 11, name: "Samsung", image: samsungLogo },
    { id: 12, name: "Woolite", image: wooliteLogo },
    { id: 13, name: "Philips", image: philipsLogo },
    { id: 14, name: "Oxiclean", image: oxicleanLogo },
    { id: 15, name: "Lg", image: lgLogo },
  ];

  const nearbyStores = [
    {
      id: 1,
      name: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      address:
        "Pragathi Mansion, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003, India",
      image: malleshwaramStoreImg,
    },
    {
      id: 2,
      name: "Bachelor's Dhobi Laundry Store, Bellandur",
      address:
        "24, Palm Ave, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103, India",
      image: bellandurStoreImg,
    },
    {
      id: 3,
      name: "Bachelor's Dhobi Laundry Store, RR Nagar",
      address:
        "BFML Layout, 2nd main road, 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098, India",
      image: rrNagarStoreImg,
    },
    {
      id: 4,
      name: "Bachelor's Dhobi Laundry Store, K R Puram",
      address:
        "KHB Colony, Bhattarahalli, Hosakotehoralnahalli, K R Puram, Bengaluru, Karnataka 560049, India",
      image: krPuramStoreImg,
    },
  ];

  // Auto-sliding functionality
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const brandItemWidth = 180; // Width of each brand item including margins
    const scrollSpeed = 0.6; // Pixels per animation frame - lower is slower
    const totalWidth = trustedBrands.length * brandItemWidth;

    const scroll = () => {
      scrollAmount += scrollSpeed;

      // Reset scroll position when we've scrolled the width of one item
      if (scrollAmount >= totalWidth) {
        scrollAmount = 0;
      }

      if (slider) {
        slider.scrollLeft = scrollAmount;
      }

      animationId = requestAnimationFrame(scroll);
    };

    let animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trustedBrands.length]);

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero text-center py-5 bg-info-subtle bg-height">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-start">
              <h1>Effortless Laundry Solution at your Fingertips</h1>
              <p>
                Streamline your laundry routine with our intuitive app that
                offers on-demand pickup, eco-friendly washing, and convenient
                scheduling.
              </p>
              <Button variant="dark" className="mt-3">
                <a
                  href="/SchedulePickup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Schedule a Pickup
                </a>
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={heroLogo}
                alt="Laundry Service"
                className="img-fluid hero-img"
                style={{ width: "70%", height: "70%" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section
        className="text-center py-5 container-fluid shadow-lg rounded-5 justify-content-center services-center"
        id="service"
      >
        <Container>
          <Row className="services">
            <Col md={3}>
              <img src={washFold} alt="Wash & Fold" />
              <p>
                <strong>Wash & Fold</strong>
              </p>
              <p className="p-4">
                Freshly washed, neatly folded, and ready to wear—perfect for
                your everyday laundry needs. Enjoy hygienic and hassle-free
                laundry with quick turnaround times.
              </p>
            </Col>
            <Col md={3}>
              <img src={washIron} alt="Wash & Iron" />
              <p>
                <strong>Wash & Iron</strong>
              </p>
              <p className="p-4">
                Get crisp, clean clothes with our wash and iron service,
                ensuring a polished look every time. Ideal for office wear,
                casual outfits, and special occasions.
              </p>
            </Col>
            <Col md={3}>
              <img src={steamIron} alt="Steam Iron" />
              <p>
                <strong>Steam Iron</strong>
              </p>
              <p className="p-4">
                A gentle yet effective ironing service that removes wrinkles
                while preserving fabric quality. Best for delicate fabrics like
                silk, linen, and wool to maintain their shine and texture.
              </p>
            </Col>
            <Col md={3}>
              <img src={dryClean} alt="Dry Cleaning" />
              <p>
                <strong>Dry Cleaning</strong>
              </p>
              <p className="p-4">
                Professional stain removal and deep cleaning for delicate
                fabrics, keeping them fresh and long-lasting. Perfect for suits,
                dresses, and specialty garments that require expert care.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="about text-center py-5 bg-info-subtle">
        <Container>
          <Row>
            <Col md={6}>
              <img
                src={aboutImg}
                alt="About Us"
                className="img-fluid about-img"
              />
            </Col>
            <Col md={6}>
              <h1 style={{ textAlign: "left" }}>Hi! We're Bachelor's Dhobi</h1>
              <p style={{ textAlign: "left" }}>
                We blend technology with eco-friendly cleaning to give your
                clothes the best care. From daily washes to premium dry
                cleaning, we handle it all hassle-free.
              </p>
              <ul style={{ textAlign: "left" }}>
                <li>
                  <img src={li1Img} alt="Quick Service" />
                  Quick & Reliable Service
                </li>
                <li>
                  <img src={li2Img} alt="Eco-friendly" />
                  Eco-Friendly Cleaning
                </li>
                <li>
                  <img src={li3Img} alt="Delivery" />
                  Pickup & Delivery at Your Doorstep
                </li>
              </ul>
              <p style={{ textAlign: "left" }}>
                Because life's too short for laundry - let us handle the dirty
                work!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Premium Laundry Care Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="fw-bold">
                Premium Laundry Care with Trusted Brands
              </h2>
              <p className="text-muted">
                We use only the highest quality products to ensure your clothes
                look their best
              </p>
            </Col>
          </Row>

          <div className="position-relative mb-5">
            <div ref={sliderRef} className="brands-slider">
              <div className="brands-track">
                {/* Original set of brands */}
                {trustedBrands.map((brand) => (
                  <div key={brand.id} className="brand-item">
                    <div className="bg-white rounded p-3 h-100 d-flex align-items-center justify-content-center">
                      <img
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        className="img-fluid"
                        style={{ maxHeight: "90px" }}
                      />
                    </div>
                  </div>
                ))}

                {/* Duplicate set of brands to create seamless loop */}
                {trustedBrands.map((brand) => (
                  <div key={`duplicate-${brand.id}`} className="brand-item">
                    <div className="bg-white rounded p-3 h-100 d-flex align-items-center justify-content-center">
                      <img
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        className="img-fluid"
                        style={{ maxHeight: "80px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Row className="mt-4">
            <Col className="text-center">
              <p>
                Our professional cleaning process uses premium detergents and
                fabric care products to ensure your garments receive the best
                treatment possible.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Nearby Stores Section */}
      <section className="py-5 bg-info-subtle">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="fw-bold">Know Your Nearby Stores</h2>
              <p className="text-muted">
                Find the closest Bachelor's Dhobi location to you
              </p>
            </Col>
          </Row>

          <Row>
            {nearbyStores.map((store) => (
              <Col
                key={store.id}
                md={3}
                className="mb-4 d-flex flex-column align-items-center p-3"
              >
                <Card className="h-100 shadow-lg">
                  <Card.Img
                    variant="top"
                    src={store.image}
                    alt={store.name}
                    className="img-fluid rounded-4"
                    style={{
                      height: "370px",
                      objectFit: "cover",
                      padding: "10px",
                    }}
                  />
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="fw-bold fs-6 mb-0">
                        {store.name}
                      </Card.Title>
                    </div>
                    <Card.Text className="small text-muted mb-3">
                      {store.address}
                    </Card.Text>
                    <div className="d-flex">
                      <Button
                        size="sm"
                        className="me-2 rounded-4 px-4"
                        style={{
                          backgroundColor: "#003242",
                        }}
                      >
                        Get Direction
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="primary"
                className="rounded-pill px-4 shadow-lg"
                href="/Stores"
                style={{
                  backgroundColor: "#003242",
                }}
              >
                View All Locations
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* First Order Section */}
      <section id="first-order" className="first-order text-start py-5">
        <Container>
          <Row className="py-5">
            <Col md={3}>
              <img
                className="first-order-img1 shadow-lg"
                src={manIronImg}
                alt="Man Ironing"
              />
            </Col>
            <Col md={3}>
              <img
                className="first-order-img2 shadow-lg"
                src={foldedClothesImg}
                alt="Folded Clothes"
              />
            </Col>
            <Col md={5}>
              <h1>Laundry is Easier with Dependable Cleaners</h1>
              <p>
                Dependable Cleaners makes laundry & dry cleaning more convenient
                than ever.
              </p>
              <ul style={{ textAlign: "left" }}>
                <li>
                  <img src={foli1Img} alt="Quick Service" />
                  Wash and Fold by the Pound
                </li>
                <li>
                  <img src={foli2Img} alt="Eco-friendly" />
                  Free Pickup and Delivery for Dry Cleaning and Laundry
                </li>
                <li>
                  <img src={foli3Img} alt="Delivery" />
                  Free Mask Cleaning with Dry Cleaning Order
                </li>
              </ul>
              <Button className="me-2 mt-3 fo-btn">
                <a
                  href="/SchedulePickup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Make your First Order
                </a>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us text-center py-5 bg-info-subtle">
        <Container>
          <h1>Why Us?</h1>
          <p>
            We provide advantages that will certainly guarantee the <br></br>
            cleanliness and completeness of you goods
          </p>
          <Row className="mt-4">
            <Col md={4}>
              <img
                className="why-img"
                src={whyHygienicImg}
                alt="Hygienic laundry"
              />
              <h5>Hygienic Guaranteed</h5>
              <p>
                One washing machine <br></br> per customer and also minimize{" "}
                <br></br>switched goods.
              </p>
            </Col>
            <Col md={4}>
              <img className="why-img" src={whyAssuranceImg} alt="Assurance" />
              <h5>Assurance of Goods</h5>
              <p>
                Customer's belongings are placed in<br></br> one basket so that
                nothing is lost or <br></br>left behind.
              </p>
            </Col>
            <Col md={4}>
              <img
                className="why-img"
                src={whyWeighingScaleImg}
                alt="Weighing Scale"
              />
              <h5>Accurate Calculation</h5>
              <p>
                Calculation of goods will be done in<br></br>kg and pieces so
                that it will be more<br></br>accurate for payment after
                completion.
              </p>
            </Col>
          </Row>
          <Row className="mt-3 justify-content-center">
            <Col md={4}>
              <img className="why-img" src={whyDeliveryImg} alt="Delivery" />
              <h5>Delivery Service</h5>
              <p>
                We offer a pick-up and drop-off <br></br>services at an
                affordable cost.
              </p>
            </Col>
            <Col md={4}>
              <img className="why-img" src={whyPaymentImg} alt="Payment" />
              <h5>Payment Options</h5>
              <p>
                Payment methods can be cash or <br></br>electronic payment.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonial" className="testimonials text-center py-5 mt-5">
        <Container>
          <h1>What They Say About Us</h1>
          <Row className="mt-5 justify-content-center m-6">
            <Col md={3}>
              <div className="p-3 border testimonials-card">
                <img src={testimonialYingLiImg} alt="Ying Li" />
                <h5>Ying Li</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>
                  "Great laundry service! <br></br>Easy booking, and fast{" "}
                  <br></br>delivery—my clothes came back<br></br> fresh and
                  clean.<br></br> Highly recommended!"
                </p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3 border testimonials-card">
                <img src={testimonialSarahWilliamsImg} alt="Sarah Williams" />
                <h5>Sarah Williams</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>
                  "Excellent service! <br></br>Quick pickup and delivery,
                  <br></br> affordable pricing, and my clothes<br></br> were
                  perfectly cleaned. <br></br>Will definitely use again!"
                </p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3 border testimonials-card">
                <img src={testimonialEmilyRobertsImg} alt="Emily Roberts" />
                <h5>Emily Roberts</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>
                  "Very convenient and reliable!<br></br> The tracking feature
                  is great,<br></br> and the quality of cleaning is<br></br>{" "}
                  top-notch.<br></br> Highly satisfied!"
                </p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-3 border testimonials-card">
                <img src={testimonialJohnDoeImg} alt="Emily Roberts" />
                <h5>John Doe</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>
                  "Excellent service—both convenient <br></br> and reliable! The
                  tracking system<br></br> is very useful, and <br></br>the
                  cleaning quality is exceptional. <br></br>Truly satisfied!"
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <section id="contact" className="py-5">
        <div className="container bg-info-subtle contact p-5">
          <h1 className="text-center mb-5">Contact Us</h1>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Your phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 contact-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;
