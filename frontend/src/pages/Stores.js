import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import malleshwaramStoreImg from "../assets/malleshwaram-store.png";
import bellandurStoreImg from "../assets/bellandur-store.png";
import rrNagarStoreImg from "../assets/rr-nagar-store.png";
import krPuramStoreImg from "../assets/kr-puram-store.png";
import thanisandraStoreImg from "../assets/thanisandra-store.png";
import yelahankaStoreImg from "../assets/yelahanka-store.png";
import sahakaraNagarStoreImg from "../assets/sahakara-nagar-store.png";
import marathahalliStoreImg from "../assets/marathahalli-store.png";
import hoodiStoreImg from "../assets/hoodi-store.png";

const StoreLocator = () => {
  const stores = [
    {
      id: 1,
      name: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      address:
        "Pragathi Mansion, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003, India",
      image: malleshwaramStoreImg,
      highlight: "Family Favorite",
      openHours: "7 AM - 9 PM",
    },
    {
      id: 2,
      name: "Bachelor's Dhobi Laundry Store, Bellandur",
      address:
        "24, Palm Ave, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103, India",
      image: bellandurStoreImg,
      highlight: "Express Service",
      openHours: "6 AM - 10 PM",
    },
    {
      id: 3,
      name: "Bachelor's Dhobi Laundry Store, RR Nagar",
      address:
        "BFML Layout, 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098, India",
      image: rrNagarStoreImg,
      highlight: "Eco-Friendly",
      openHours: "7 AM - 9 PM",
    },
    {
      id: 4,
      name: "Bachelor's Dhobi Laundry Store, K R Puram",
      address:
        "KHB Colony, Bhattarahalli, Hosakotehoralnahalli, K R Puram, Bengaluru, Karnataka 560049, India",
      image: krPuramStoreImg,
      highlight: "Premium Care",
      openHours: "7 AM - 8 PM",
    },
    {
      id: 5,
      name: "Bachelor's Dhobi Laundry Store, Thanisandra Main Road",
      address:
        "Off Kempegowda International Airport Road, 5th Phase, Thanisandra, Bengaluru, Karnataka 560077, India",
      image: thanisandraStoreImg,
      highlight: "New Location",
      openHours: "8 AM - 9 PM",
    },
    {
      id: 6,
      name: "Bachelor's Dhobi Laundry Store, Yelahanka",
      address:
        "No. 11/1, A S Complex, 1st A Main Road, Near Police Station, Yelahanka New Town 560064",
      image: yelahankaStoreImg,
      highlight: "24-Hour Dropbox",
      openHours: "7 AM - 9 PM",
    },
    {
      id: 7,
      name: "Bachelor's Dhobi Laundry Store, Sahakara Nagar",
      address:
        "Kodigehalli main road, sahakarnagar, Sahakarnagar, Bengaluru, Karnataka 560092, India",
      image: sahakaraNagarStoreImg,
      highlight: "Premium Fabrics",
      openHours: "7 AM - 8 PM",
    },
    {
      id: 8,
      name: "Bachelor's Dhobi Laundry Store, Marathalli",
      address:
        "Sri Vinayaka Theatre, Thulasi Theatre Road, Marathahalli, Bengaluru, Karnataka 560037",
      image: marathahalliStoreImg,
      highlight: "Tech-Friendly",
      openHours: "6 AM - 10 PM",
    },
    {
      id: 9,
      name: "Bachelor's Dhobi Laundry Store, Hoodi",
      address:
        "Gali Rd, Maruthi Nagar, Basavanna Nagar, Whitefield, Bengaluru, Karnataka 560048, India",
      image: hoodiStoreImg,
      highlight: "Corporate Services",
      openHours: "7 AM - 9 PM",
    },
  ];

  return (
    <div className="app bg-info-subtle">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <div className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="mx-auto text-center">
              <h1
                className="display-4 fw-bold mb-3"
                style={{ color: "#003242" }}
              >
                Find Your Perfect Laundry Spot
              </h1>
              <p className="lead mb-4">
                Crisp, Clean, and Convenient — Bachelor's Dhobi Laundry is Just
                Around the Corner!
              </p>
              <p
                className="mx-auto text-center mb-0"
                style={{ maxWidth: "700px" }}
              >
                With 9 locations across Bengaluru, we're bringing professional
                laundry services closer to your doorstep. Experience the
                Bachelor's Dhobi difference today!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Why Choose Us Banner */}
      <div className="py-4" style={{ backgroundColor: "#003242" }}>
        <Container>
          <Row className="text-center text-white">
            <Col md={4}>
              <h5>✨ Premium Quality</h5>
              <p className="small mb-0">Expertly handled fabrics, every time</p>
            </Col>
            <Col md={4}>
              <h5>⚡ Quick Turnaround</h5>
              <p className="small mb-0">Express services available</p>
            </Col>
            <Col md={4}>
              <h5>🌿 Eco-Friendly Options</h5>
              <p className="small mb-0">Gentle on clothes, kind to earth</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Store Listings Title */}
      <Container className="py-5">
        <Row>
          {stores.map((store) => (
            <Col lg={4} md={6} className="p-5" key={store.id}>
              <Card className="h-100 shadow-lg rounded ">
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
                  <Card.Text className="small text-muted">
                    {store.address}
                  </Card.Text>
                  <Button
                    size="sm"
                    className="rounded-4 px-4"
                    style={{
                      backgroundColor: "#003242",
                    }}
                  >
                    Get Direction
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StoreLocator;
