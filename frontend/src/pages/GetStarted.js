import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import FooterBeforeLogin from "../components/FooterBeforeLogin";
import NavbarBeforeLogin from "../components/NavbarBeforeLogin";
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
import "./GetStarted.css";

const GetStarted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/HomePage", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <NavbarBeforeLogin />

      {/* Hero Section */}
      <section
        id="hero"
        className="hero text-center py-5 bg-info-subtle bg-height"
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-start">
              <h1>Effortless Laundry Solution at your Fingertips</h1>
              <p>
                Streamline your laundry routine with our intuitive app that
                offers on-demand pickup, eco-friendly washing, and convenient
                scheduling.
              </p>
              <Button variant="dark" className="me-2 mt-3 hero-btn">
                <a
                  href="/Signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Join Now
                </a>
              </Button>
              <Button variant="outline-dark" className="mt-3 hero-btn">
                <a
                  href="#service"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Discover More
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
        id="service"
        className="text-center py-5 container-fluid shadow-lg rounded-5 justify-content-center services-center"
      >
        <Container>
          <Row className="services">
            <Col md={3}>
              <img src={washFold} alt="Wash & Fold" />
              <p>
                <strong>Wash & Fold</strong>
              </p>
            </Col>
            <Col md={3}>
              <img src={washIron} alt="Wash & Iron" />
              <p>
                <strong>Wash & Iron</strong>
              </p>
            </Col>
            <Col md={3}>
              <img src={steamIron} alt="Steam Iron" />
              <p>
                <strong>Steam Iron</strong>
              </p>
            </Col>
            <Col md={3}>
              <img src={dryClean} alt="Dry Cleaning" />
              <p>
                <strong>Dry Cleaning</strong>
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
                  href="/Signup"
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
      <section id="contact" className="py-5">
        <div className="container bg-info-subtle contact p-5">
          <h1 className="text-center mb-5">Contact Us</h1>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Your name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Your phone"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button className="me-2 mt-3 contact-btn">Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <FooterBeforeLogin />
    </div>
  );
};

export default GetStarted;
