import React, { useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import washFoldActive from "../assets/wash-fold-active.png";
import washFoldInactive from "../assets/wash-fold-inactive.png";
import washIronActive from "../assets/wash-iron-active.png";
import washIronInactive from "../assets/wash-iron-inactive.png";
import steamIronActive from "../assets/steam-iron-active.png";
import steamIronInactive from "../assets/steam-iron-inactive.png";
import dryCleanActive from "../assets/dry-cleaning-active.png";
import dryCleanInactive from "../assets/dry-cleaning-inactive.png";

// Import clothing item icons for men
import halfSleeveShirtIcon from "../assets/washFoldPrice/half-sleeve-shirt.png";
import halfSleeveTShirtIcon from "../assets/washFoldPrice/half-sleeve-tshirt.png";
import fullSleeveTShirtIcon from "../assets/washFoldPrice/full-sleeve-tshirt.png";
import fullSleeveShirtIcon from "../assets/washFoldPrice/full-sleeve-shirt.png";
import jacketIcon from "../assets/washFoldPrice/jacket.png";
import flakJacketIcon from "../assets/washFoldPrice/flak-jacket.png";
import trousersIcon from "../assets/washFoldPrice/trousers.png";
import jeansIcon from "../assets/washFoldPrice/jeans.png";
import shortsIcon from "../assets/washFoldPrice/shorts.png";
import sweatshirtIcon from "../assets/washFoldPrice/sweatshirt.png";
import trackpantIcon from "../assets/washFoldPrice/trackpant.png";
import kurtaIcon from "../assets/washFoldPrice/kurta.png";

// Import clothing item icons for women
import halfSleeveShirtIconWomen from "../assets/washFoldPrice/half-sleeve-shirt-women.png";
import halfSleeveTShirtIconWomen from "../assets/washFoldPrice/half-sleeve-tshirt-women.png";
import fullSleeveTShirtIconWomen from "../assets/washFoldPrice/full-sleeve-tshirt-women.png";
import fullSleeveShirtIconWomen from "../assets/washFoldPrice/full-sleeve-shirt-women.png";
import jacketIconWomen from "../assets/washFoldPrice/jacket-women.png";
import bathrobeIconWomen from "../assets/washFoldPrice/bathrobe-women.png";
import trousersIconWomen from "../assets/washFoldPrice/trousers-women.png";
import jeggingsIconWomen from "../assets/washFoldPrice/jeggings-women.png";
import petticoatIconWomen from "../assets/washFoldPrice/petticoat-women.png";
import jumpsuitIconWomen from "../assets/washFoldPrice/jumpsuit-women.png";
import sareeIconWomen from "../assets/washFoldPrice/saree-women.png";
import nightGownIconWomen from "../assets/washFoldPrice/night-gown-women.png";

// Import clothing item icons for kids
import halfSleeveShirtIconKids from "../assets/washFoldPrice/half-sleeve-shirt-kids.png";
import halfSleeveTShirtIconKids from "../assets/washFoldPrice/half-sleeve-tshirt-kids.png";
import trousersIconKids from "../assets/washFoldPrice/trousers-kids.png";
import jeansIconKids from "../assets/washFoldPrice/jeans-kids.png";
import shortsIconKids from "../assets/washFoldPrice/shorts-kids.png";
import jacketIconKids from "../assets/washFoldPrice/jacket-kids.png";
import kurtaIconKids from "../assets/washFoldPrice/kurta-kids.png";
import sweaterIconKids from "../assets/washFoldPrice/sweater-kids.png";
import jumpsuitIconKids from "../assets/washFoldPrice/jumpsuit-kids.png";

// Import clothing item icons for kids
import bedSheetIcon from "../assets/washFoldPrice/bedsheet-household.png";
import blanketIcon from "../assets/washFoldPrice/blanket-household.png";
import curtainIcon from "../assets/washFoldPrice/curtain-household.png";
import pillowCoverIcon from "../assets/washFoldPrice/pillow-cover-household.png";
import duvetIcon from "../assets/washFoldPrice/duvet-household.png";
import tableClothIcon from "../assets/washFoldPrice/table-cloth-household.png";
import carpetIcon from "../assets/washFoldPrice/carpet-household.png";
import cushionCoverIcon from "../assets/washFoldPrice/cushion-cover-household.png";
import towelIcon from "../assets/washFoldPrice/towel-household.png";
import sofaCoverIcon from "../assets/washFoldPrice/sofa-cover-household.png";

function PriceList() {
  const [activeTab, setActiveTab] = useState("men");
  const [activeService, setActiveService] = useState("wash_fold");

  // Memoize service items to prevent re-creation on each render
  const serviceItems = useMemo(
    () => ({
      wash_fold: {
        men: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹25",
            image: halfSleeveShirtIcon,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹25",
            image: halfSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹35",
            image: fullSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹30",
            image: fullSleeveShirtIcon,
          },
          { name: "Jacket", price: "₹140", image: jacketIcon },
          {
            name: "Flak Jacket",
            price: "₹150",
            image: flakJacketIcon,
          },
          { name: "Trousers", price: "₹40", image: trousersIcon },
          { name: "Jeans", price: "₹50", image: jeansIcon },
          { name: "Shorts", price: "₹25", image: shortsIcon },
          { name: "Sweatshirt", price: "₹75", image: sweatshirtIcon },
          { name: "Trackpant", price: "₹40", image: trackpantIcon },
          { name: "Kurta", price: "₹40", image: kurtaIcon },
        ],
        women: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹25",
            image: halfSleeveShirtIconWomen,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹25",
            image: halfSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹35",
            image: fullSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹30",
            image: fullSleeveShirtIconWomen,
          },
          { name: "Jacket", price: "₹140", image: jacketIconWomen },
          {
            name: "Bathrobe",
            price: "₹75",
            image: bathrobeIconWomen,
          },
          { name: "Trousers", price: "₹40", image: trousersIconWomen },
          { name: "Jeggings", price: "₹50", image: jeggingsIconWomen },
          { name: "Petticoat", price: "₹25", image: petticoatIconWomen },
          { name: "Jumpsuit", price: "₹75", image: jumpsuitIconWomen },
          { name: "Saree", price: "₹50", image: sareeIconWomen },
          { name: "Night Gown", price: "₹50", image: nightGownIconWomen },
        ],
        kids: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹15",
            image: halfSleeveShirtIconKids,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹15",
            image: halfSleeveTShirtIconKids,
          },
          { name: "Trousers", price: "₹20", image: trousersIconKids },
          { name: "Jeans", price: "₹20", image: jeansIconKids },
          { name: "Frock", price: "₹25", image: shortsIconKids },
          { name: "Kurta", price: "₹15", image: kurtaIconKids },
          { name: "Jumpsuit", price: "₹20", image: jumpsuitIconKids },
          { name: "Sweater", price: "₹25", image: sweaterIconKids },
          { name: "Shorts", price: "₹15", image: shortsIconKids },
          { name: "Jacket", price: "₹100", image: jacketIconKids },
        ],
        household: [
          {
            name: "Bed Sheet",
            price: "₹50",
            image: bedSheetIcon,
          },
          {
            name: "Blanket",
            price: "₹100",
            image: blanketIcon,
          },
          {
            name: "Curtain",
            price: "₹40",
            image: curtainIcon,
          },
          {
            name: "Pillow Cover",
            price: "₹20",
            image: pillowCoverIcon,
          },
          {
            name: "Duvet",
            price: "₹120",
            image: duvetIcon,
          },
          {
            name: "Table Cloth",
            price: "₹35",
            image: tableClothIcon,
          },
          {
            name: "Carpet",
            price: "₹150",
            image: carpetIcon,
          },
          {
            name: "Cushion Cover",
            price: "₹30",
            image: cushionCoverIcon,
          },
          {
            name: "Towel",
            price: "₹25",
            image: towelIcon,
          },
          {
            name: "Sofa Cover",
            price: "₹80",
            image: sofaCoverIcon,
          },
        ],
      },

      wash_iron: {
        men: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹40",
            image: halfSleeveShirtIcon,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹40",
            image: halfSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹50",
            image: fullSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹50",
            image: fullSleeveShirtIcon,
          },
          { name: "Jacket", price: "₹80", image: jacketIcon },
          {
            name: "Flak Jacket",
            price: "₹80",
            image: flakJacketIcon,
          },
          { name: "Trousers", price: "₹55", image: trousersIcon },
          { name: "Jeans", price: "₹60", image: jeansIcon },
          { name: "Shorts", price: "₹45", image: shortsIcon },
          { name: "Sweatshirt", price: "₹100", image: sweatshirtIcon },
          { name: "Trackpant", price: "₹60", image: trackpantIcon },
          { name: "Kurta", price: "₹55", image: kurtaIcon },
        ],
        women: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹35",
            image: halfSleeveShirtIconWomen,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹40",
            image: halfSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹55",
            image: fullSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹45",
            image: fullSleeveShirtIconWomen,
          },
          { name: "Jacket", price: "₹175", image: jacketIconWomen },
          {
            name: "Bathrobe",
            price: "₹90",
            image: bathrobeIconWomen,
          },
          { name: "Trousers", price: "₹60", image: trousersIconWomen },
          { name: "Jeggings", price: "₹70", image: jeggingsIconWomen },
          { name: "Petticoat", price: "₹40", image: petticoatIconWomen },
          { name: "Jumpsuit", price: "₹100", image: jumpsuitIconWomen },
          { name: "Saree", price: "₹90", image: sareeIconWomen },
          { name: "Night Gown", price: "₹60", image: nightGownIconWomen },
        ],
        kids: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹25",
            image: halfSleeveShirtIconKids,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹25",
            image: halfSleeveTShirtIconKids,
          },
          { name: "Trousers", price: "₹30", image: trousersIconKids },
          { name: "Jeans", price: "₹30", image: jeansIconKids },
          { name: "Frock", price: "₹40", image: shortsIconKids },
          { name: "Kurta", price: "₹25", image: kurtaIconKids },
          { name: "Jumpsuit", price: "₹30", image: jumpsuitIconKids },
          { name: "Sweater", price: "₹45", image: sweaterIconKids },
          { name: "Shorts", price: "₹25", image: shortsIconKids },
          { name: "Jacket", price: "₹125", image: jacketIconKids },
        ],
        household: [
          {
            name: "Bed Sheet",
            price: "₹60",
            image: bedSheetIcon,
          },
          {
            name: "Blanket",
            price: "₹120",
            image: blanketIcon,
          },
          {
            name: "Curtain",
            price: "₹50",
            image: curtainIcon,
          },
          {
            name: "Pillow Cover",
            price: "₹30",
            image: pillowCoverIcon,
          },
          {
            name: "Duvet",
            price: "₹130",
            image: duvetIcon,
          },
          {
            name: "Table Cloth",
            price: "₹45",
            image: tableClothIcon,
          },
          {
            name: "Carpet",
            price: "₹160",
            image: carpetIcon,
          },
          {
            name: "Cushion Cover",
            price: "₹40",
            image: cushionCoverIcon,
          },
          {
            name: "Towel",
            price: "₹35",
            image: towelIcon,
          },
          {
            name: "Sofa Cover",
            price: "₹90",
            image: sofaCoverIcon,
          },
        ],
      },

      steam_iron: {
        men: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹20",
            image: halfSleeveShirtIcon,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹20",
            image: halfSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹25",
            image: fullSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹20",
            image: fullSleeveShirtIcon,
          },
          { name: "Jacket", price: "₹110", image: jacketIcon },
          {
            name: "Flak Jacket",
            price: "₹100",
            image: flakJacketIcon,
          },
          { name: "Trousers", price: "₹30", image: trousersIcon },
          { name: "Jeans", price: "₹35", image: jeansIcon },
          { name: "Shorts", price: "₹25", image: shortsIcon },
          { name: "Sweatshirt", price: "₹75", image: sweatshirtIcon },
          { name: "Trackpant", price: "₹40", image: trackpantIcon },
          { name: "Kurta", price: "₹35", image: kurtaIcon },
        ],
        women: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹15",
            image: halfSleeveShirtIconWomen,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹15",
            image: halfSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹25",
            image: fullSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹20",
            image: fullSleeveShirtIconWomen,
          },
          { name: "Jacket", price: "₹150", image: jacketIconWomen },
          {
            name: "Bathrobe",
            price: "₹70",
            image: bathrobeIconWomen,
          },
          { name: "Trousers", price: "₹30", image: trousersIconWomen },
          { name: "Jeggings", price: "₹40", image: jeggingsIconWomen },
          { name: "Petticoat", price: "₹20", image: petticoatIconWomen },
          { name: "Jumpsuit", price: "₹70", image: jumpsuitIconWomen },
          { name: "Saree", price: "₹80", image: sareeIconWomen },
          { name: "Night Gown", price: "₹40", image: nightGownIconWomen },
        ],
        kids: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹10",
            image: halfSleeveShirtIconKids,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹10",
            image: halfSleeveTShirtIconKids,
          },
          { name: "Trousers", price: "₹15", image: trousersIconKids },
          { name: "Jeans", price: "₹15", image: jeansIconKids },
          { name: "Frock", price: "₹20", image: shortsIconKids },
          { name: "Kurta", price: "₹15", image: kurtaIconKids },
          { name: "Jumpsuit", price: "₹15", image: jumpsuitIconKids },
          { name: "Sweater", price: "₹25", image: sweaterIconKids },
          { name: "Shorts", price: "₹15", image: shortsIconKids },
          { name: "Jacket", price: "₹95", image: jacketIconKids },
        ],
        household: [
          {
            name: "Bed Sheet",
            price: "₹40",
            image: bedSheetIcon,
          },
          {
            name: "Blanket",
            price: "₹90",
            image: blanketIcon,
          },
          {
            name: "Curtain",
            price: "₹30",
            image: curtainIcon,
          },
          {
            name: "Pillow Cover",
            price: "₹20",
            image: pillowCoverIcon,
          },
          {
            name: "Duvet",
            price: "₹110",
            image: duvetIcon,
          },
          {
            name: "Table Cloth",
            price: "₹25",
            image: tableClothIcon,
          },
          {
            name: "Carpet",
            price: "₹120",
            image: carpetIcon,
          },
          {
            name: "Cushion Cover",
            price: "₹20",
            image: cushionCoverIcon,
          },
          {
            name: "Towel",
            price: "₹20",
            image: towelIcon,
          },
          {
            name: "Sofa Cover",
            price: "₹70",
            image: sofaCoverIcon,
          },
        ],
      },

      dry_clean: {
        men: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹75",
            image: halfSleeveShirtIcon,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹75",
            image: halfSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹85",
            image: fullSleeveTShirtIcon,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹80",
            image: fullSleeveShirtIcon,
          },
          { name: "Jacket", price: "₹300", image: jacketIcon },
          {
            name: "Flak Jacket",
            price: "₹250",
            image: flakJacketIcon,
          },
          { name: "Trousers", price: "₹140", image: trousersIcon },
          { name: "Jeans", price: "₹150", image: jeansIcon },
          { name: "Shorts", price: "₹125", image: shortsIcon },
          { name: "Sweatshirt", price: "₹175", image: sweatshirtIcon },
          { name: "Trackpant", price: "₹140", image: trackpantIcon },
          { name: "Kurta", price: "₹300", image: kurtaIcon },
        ],
        women: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹85",
            image: halfSleeveShirtIconWomen,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹85",
            image: halfSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve T-Shirt",
            price: "₹75",
            image: fullSleeveTShirtIconWomen,
          },
          {
            name: "Full-Sleeve Shirt",
            price: "₹80",
            image: fullSleeveShirtIconWomen,
          },
          { name: "Jacket", price: "₹300", image: jacketIconWomen },
          {
            name: "Bathrobe",
            price: "₹125",
            image: bathrobeIconWomen,
          },
          { name: "Trousers", price: "₹120", image: trousersIconWomen },
          { name: "Jeggings", price: "₹150", image: jeggingsIconWomen },
          { name: "Petticoat", price: "₹110", image: petticoatIconWomen },
          { name: "Jumpsuit", price: "₹175", image: jumpsuitIconWomen },
          { name: "Saree", price: "₹500", image: sareeIconWomen },
          { name: "Night Gown", price: "₹250", image: nightGownIconWomen },
        ],
        kids: [
          {
            name: "Half-Sleeve Shirt",
            price: "₹50",
            image: halfSleeveShirtIconKids,
          },
          {
            name: "Half-Sleeve T-Shirt",
            price: "₹50",
            image: halfSleeveTShirtIconKids,
          },
          { name: "Trousers", price: "₹60", image: trousersIconKids },
          { name: "Jeans", price: "₹60", image: jeansIconKids },
          { name: "Frock", price: "₹80", image: shortsIconKids },
          { name: "Kurta", price: "₹150", image: kurtaIconKids },
          { name: "Jumpsuit", price: "₹80", image: jumpsuitIconKids },
          { name: "Sweater", price: "₹100", image: sweaterIconKids },
          { name: "Shorts", price: "₹150", image: shortsIconKids },
          { name: "Jacket", price: "₹200", image: jacketIconKids },
        ],
        household: [
          {
            name: "Bed Sheet",
            price: "₹150",
            image: bedSheetIcon,
          },
          {
            name: "Blanket",
            price: "₹200",
            image: blanketIcon,
          },
          {
            name: "Curtain",
            price: "₹240",
            image: curtainIcon,
          },
          {
            name: "Pillow Cover",
            price: "₹80",
            image: pillowCoverIcon,
          },
          {
            name: "Duvet",
            price: "₹250",
            image: duvetIcon,
          },
          {
            name: "Table Cloth",
            price: "₹150",
            image: tableClothIcon,
          },
          {
            name: "Carpet",
            price: "₹250",
            image: carpetIcon,
          },
          {
            name: "Cushion Cover",
            price: "₹90",
            image: cushionCoverIcon,
          },
          {
            name: "Towel",
            price: "₹60",
            image: towelIcon,
          },
          {
            name: "Sofa Cover",
            price: "₹280",
            image: sofaCoverIcon,
          },
        ],
      },
    }),
    []
  );

  // Memoize laundry services
  const laundryServices = useMemo(
    () => [
      {
        id: "wash_fold",
        name: "WASH + FOLD",
        activeImage: washFoldActive,
        inactiveImage: washFoldInactive,
      },
      {
        id: "wash_iron",
        name: "WASH + IRON",
        activeImage: washIronActive,
        inactiveImage: washIronInactive,
      },
      {
        id: "steam_iron",
        name: "STEAM IRON",
        activeImage: steamIronActive,
        inactiveImage: steamIronInactive,
      },
      {
        id: "dry_clean",
        name: "DRY CLEAN",
        activeImage: dryCleanActive,
        inactiveImage: dryCleanInactive,
      },
    ],
    []
  );

  // Memoize service click handler
  const handleServiceClick = useCallback((serviceId) => {
    setActiveService(serviceId);
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Navbar section */}
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        {/* Hero Section */}
        <div className="py-5 bg-info-subtle">
          <Container>
            <Row className="align-items-center">
              <Col md={8} className="mx-auto text-center">
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ color: "#003242" }}
                >
                  Professional Care at Transparent Prices
                </h1>
                <p className="lead mb-4">
                  Quality laundry service doesn't have to break the bank. At
                  Bachelor's Dhobi, we combine affordability with excellence.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-5">
          <Row>
            {/* Service Types Sidebar */}
            <Col md={3}>
              <Card className="mb-4 border-0 rounded-4">
                <div
                  className="text-dark rounded-4"
                  style={{ backgroundColor: "#003242", overflow: "hidden" }}
                >
                  {laundryServices.map((service) => {
                    const isActive = activeService === service.id;
                    return (
                      <div
                        key={service.id}
                        className={`d-flex align-items-center p-3 border-bottom border-light`}
                        style={{
                          cursor: "pointer",
                          backgroundColor: isActive ? "#003242" : "#bce3fa",
                          overflow: "hidden",
                        }}
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <div className="me-3">
                          <img
                            src={
                              isActive
                                ? service.activeImage
                                : service.inactiveImage
                            }
                            alt={service.name}
                            loading="lazy"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            onError={(e) =>
                              (e.target.src = "/images/placeholder.png")
                            }
                          />
                        </div>
                        <div
                          className="fw-bold"
                          style={{ color: isActive ? "#FFFFFF" : "#000000" }}
                        >
                          {service.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Col>

            {/* Clothing Items Grid */}
            <Col md={8} className="d-flex flex-column align-items-start">
              {/* Category Tabs */}
              <div className="mb-4">
                {["men", "women", "kids", "household"].map((category) => (
                  <Button
                    key={category}
                    variant={activeTab === category ? "dark" : "outline-dark"}
                    onClick={() => setActiveTab(category)}
                    className="me-2 rounded-pill px-4"
                  >
                    {category.toUpperCase()}
                  </Button>
                ))}
              </div>

              {/* Items Grid */}
              <Row>
                {serviceItems[activeService][activeTab].map((item, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card className="h-100 border rounded-4 shadow-sm">
                      <Card.Body className="d-flex flex-column align-items-center p-4">
                        <div
                          className="bg-info bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: "70px",
                            height: "70px",
                            marginBottom: "15px",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            onError={(e) =>
                              (e.target.src = "/images/placeholder.png")
                            }
                          />
                        </div>
                        <Card.Title className="mb-3 text-center">
                          {item.name}
                        </Card.Title>
                        <Card.Text className="fs-4 fw-bold">
                          {item.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default PriceList;
