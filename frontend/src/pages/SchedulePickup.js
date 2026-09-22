import clothingTypes from "../catalog.json";
import React, { useState, useMemo, useCallback } from "react";
import {
  Truck,
  ShirtIcon,
  ShoppingBagIcon,
  Baby,
  HomeIcon,
} from "lucide-react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Alert,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api";
import { FaRupeeSign } from "react-icons/fa";

const SchedulePickup = () => {


  const [formData, setFormData] = useState({
    store: "",
    serviceType: "",
    clothingItems: {
      men: {},
      women: {},
      kids: {},
      household: {},
    },
    pickupAddress: "",
    pickupDate: "",
    pickupTime: "",
    deliveryAddress: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [clothingItem, setClothingItem] = useState("");
  const [errors, setErrors] = useState({});
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    type: "",
    message: "",
    orderId: "",
  });

  // Memoized store and service options
  const storeOptions = useMemo(
    () => [
      {
        value: "Store Malleshwaram",
        label: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      },
      {
        value: "Store Bellandur",
        label: "Bachelor's Dhobi Laundry Store, Bellandur",
      },
      {
        value: "Store RR Nagar",
        label: "Bachelor's Dhobi Laundry Store, RR Nagar",
      },
      {
        value: "Store K R Puram",
        label: "Bachelor's Dhobi Laundry Store, K R Puram",
      },
      {
        value: "Store Thanisandra Main Road",
        label: "Bachelor's Dhobi Laundry Store, Thanisandra Main Road",
      },
      {
        value: "Store Yelahanka",
        label: "Bachelor's Dhobi Laundry Store, Yelahanka",
      },
      {
        value: "Store Sahakara Nagar",
        label: "Bachelor's Dhobi Laundry Store, Sahakara Nagar",
      },
      {
        value: "Store Marathalli",
        label: "Bachelor's Dhobi Laundry Store, Marathalli",
      },
      { value: "Store Hoodi", label: "Bachelor's Dhobi Laundry Store, Hoodi" },
    ],
    []
  );

  const serviceOptions = useMemo(
    () => [
      { value: "Wash & Fold", label: "Wash & Fold" },
      { value: "Wash & Iron", label: "Wash & Iron" },
      { value: "Steam Iron", label: "Steam Iron" },
      { value: "Dry Cleaning", label: "Dry Cleaning" },
    ],
    []
  );

  const timeSlots = useMemo(
    () => [
      { value: "9 AM - 12 PM", label: "Morning (9 AM - 12 PM)" },
      { value: "12 PM - 3 PM", label: "Afternoon (12 PM - 3 PM)" },
      { value: "3 PM - 6 PM", label: "Evening (3 PM - 6 PM)" },
      { value: "6 PM - 9 PM", label: "Night (6 PM - 9 PM)" },
    ],
    []
  );

  // Get current price for an item based on selected service
  const getCurrentPrice = useCallback(
    (section, itemName) => {
      const item = clothingTypes[section].find(
        (item) => item.name === itemName
      );
      if (!item || !formData.serviceType) return 0;
      return item.prices[formData.serviceType] || 0;
    },
    [formData.serviceType]
  );

  // Update clothing item count
  const updateClothingCount = useCallback((section, itemName, count) => {
    setFormData((prev) => ({
      ...prev,
      clothingItems: {
        ...prev.clothingItems,
        [section]: {
          ...prev.clothingItems[section],
          [itemName]: count > 0 ? count : undefined,
        },
      },
    }));
  }, []);

  // Calculate total price
  const calculateTotalPrice = useMemo(() => {
    // Calculate price for each section
    const sectionPrices = Object.entries(formData.clothingItems).reduce(
      (total, [section, items]) => {
        const sectionTotal = Object.entries(items).reduce(
          (sectionSum, [itemName, count]) => {
            const itemPrice = getCurrentPrice(section, itemName);
            return sectionSum + itemPrice * count;
          },
          0
        );
        return total + sectionTotal;
      },
      0
    );

    return sectionPrices;
  }, [formData.clothingItems, getCurrentPrice]);

  // Render clothing type inputs for a section
  const renderClothingSection = (section, icon) => {
    const Icon = icon;
    return (
      <Card className="mb-3">
        <Card.Header className="d-flex align-items-center">
          <Icon className="me-2" />
          <strong>
            {section.charAt(0).toUpperCase() + section.slice(1)} Clothing
          </strong>
        </Card.Header>
        <Card.Body>
          <Row>
            {clothingTypes[section].map((item) => (
              <Col key={item.name} md={4} className="mb-2">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-2 mb-0 flex-grow-1">
                    {item.name}{" "}
                    {formData.serviceType && (
                      <span>(₹{getCurrentPrice(section, item.name)})</span>
                    )}
                  </Form.Label>
                  <div className="input-group" style={{ width: "130px" }}>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const currentCount =
                          formData.clothingItems[section][item.name] || 0;
                        updateClothingCount(
                          section,
                          item.name,
                          Math.max(0, currentCount - 1)
                        );
                      }}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={formData.clothingItems[section][item.name] || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        updateClothingCount(section, item.name, count);
                      }}
                      min="0"
                      className="text-center"
                      style={{ maxWidth: "60px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const currentCount =
                          formData.clothingItems[section][item.name] || 0;
                        updateClothingCount(
                          section,
                          item.name,
                          currentCount + 1
                        );
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  // Helper function to compare dates
  const isSameDay = useCallback((date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  // Updated validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.store) newErrors.store = "Store selection is required.";

    if (!formData.serviceType)
      newErrors.serviceType = "Service type selection is required.";

    if (!formData.pickupAddress)
      newErrors.pickupAddress = "Please provide a pickup address.";

    if (!formData.pickupDate)
      newErrors.pickupDate = "Please select a pickup date.";

    if (!formData.pickupTime)
      newErrors.pickupTime = "Please select a pickup time.";

    if (!formData.deliveryAddress)
      newErrors.deliveryAddress = "Please provide a delivery address.";

    if (!formData.deliveryDate)
      newErrors.deliveryDate = "Please select a delivery date.";

    if (!formData.deliveryTime)
      newErrors.deliveryTime = "Please select a delivery time.";

    // Check if we have any clothing items selected
    const hasItems = Object.values(formData.clothingItems).some((section) =>
      Object.values(section).some((count) => count > 0)
    );

    if (!hasItems) {
      newErrors.clothingItems = "Please select at least one item";
    }

    // Check if we have all required date and time fields before validation
    if (
      formData.pickupDate &&
      formData.deliveryDate &&
      formData.pickupTime &&
      formData.deliveryTime
    ) {
      // Convert dates to comparable format
      const pickupDate = new Date(formData.pickupDate);
      const deliveryDate = new Date(formData.deliveryDate);

      // Check if delivery date is before pickup date
      if (deliveryDate < pickupDate) {
        newErrors.deliveryDate = "Delivery date must be after pickup date";
      }

      // If it's the same day, also check the time slots
      if (isSameDay(pickupDate, deliveryDate)) {
        // Define time slots in order for comparison
        const timeSlotOrder = [
          "9 AM - 12 PM",
          "12 PM - 3 PM",
          "3 PM - 6 PM",
          "6 PM - 9 PM",
        ];

        const pickupIndex = timeSlotOrder.indexOf(formData.pickupTime);
        const deliveryIndex = timeSlotOrder.indexOf(formData.deliveryTime);

        // Check that pickup and delivery times aren't the same on the same day
        if (pickupIndex === deliveryIndex) {
          newErrors.deliveryTime =
            "Pickup and delivery times cannot be the same on the same day";
        }

        // Check that delivery time is after pickup time on the same day
        if (pickupIndex >= deliveryIndex) {
          newErrors.deliveryTime =
            "Delivery time must be after pickup time when scheduled for the same day";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isSameDay]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      try {
        // Format dates for backend (YYYY-MM-DD format)
        const pickupDate = formData.pickupDate;
        const deliveryDate = formData.deliveryDate;

        // Prepare the payload according to API request schema
        const payload = {
          store: formData.store,
          serviceType: formData.serviceType,
          clothingItems: formData.clothingItems,
          pickupAddress: formData.pickupAddress,
          pickupDate: pickupDate,
          pickupTime: formData.pickupTime,
          deliveryAddress: formData.deliveryAddress,
          deliveryDate: deliveryDate,
          deliveryTime: formData.deliveryTime,
          totalPrice: calculateTotalPrice,
        };

        // Make API call to Python backend
        const response = await axios.post(`/api/pickups/schedule`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle successful response
        if (response.status === 201) {
          setSubmitStatus({
            show: true,
            type: "success",
            message: "Pickup scheduled successfully!",
            orderId: response.data.orderId,
          });

          // Reset form after successful submission
          setFormData({
            store: "",
            serviceType: "",
            clothingItems: {
              men: {},
              women: {},
              kids: {},
              household: {},
            },
            pickupAddress: "",
            pickupDate: "",
            pickupTime: "",
            deliveryAddress: "",
            deliveryDate: "",
            deliveryTime: "",
          });
        }
      } catch (error) {
        console.error("Error scheduling pickup:", error);
        setSubmitStatus({
          show: true,
          type: "danger",
          message: `Failed to schedule pickup: ${
            error.response?.data?.message || error.message
          }`,
          orderId: "",
        });
      }
    }
  }, [validateForm, formData, calculateTotalPrice]);

  return (
    <div>
      <Navbar />

      <Container className="mt-4 mb-4">
        {/* Status Alert */}
        {submitStatus.show && (
          <Alert
            variant={submitStatus.type}
            onClose={() => setSubmitStatus({ ...submitStatus, show: false })}
            dismissible
          >
            <Alert.Heading>
              {submitStatus.type === "success" ? "Success!" : "Error!"}
            </Alert.Heading>
            <p>{submitStatus.message}</p>
            {submitStatus.orderId && (
              <p className="mb-0">
                <strong>Order ID:</strong> {submitStatus.orderId}
              </p>
            )}
          </Alert>
        )}
        <Card className="shadow">
          <Card.Header className="bg-info-subtle text-dark text-center">
            <h3 className="mb-0 d-flex justify-content-center align-items-center">
              <Truck className="me-3" /> Schedule Your Laundry Pickup
            </h3>
          </Card.Header>
          <Card.Body>
            {/* Store and Service Selection */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Store</Form.Label>
                  <Form.Select
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                    isInvalid={!!errors.store}
                  >
                    <option value="">Choose a Store</option>
                    {storeOptions.map((store) => (
                      <option key={store.value} value={store.value}>
                        {store.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.store}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    isInvalid={!!errors.serviceType}
                  >
                    <option value="">Choose Service</option>
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.serviceType}
                  </Form.Control.Feedback>
                  {!formData.serviceType && (
                    <Form.Text className="text-muted">
                      Please select a service type to see pricing
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Error for no items selected */}
            {errors.clothingItems && (
              <Alert variant="danger">{errors.clothingItems}</Alert>
            )}

            {/* Clothing Sections */}
            {renderClothingSection("men", ShirtIcon)}
            {renderClothingSection("women", ShoppingBagIcon)}
            {renderClothingSection("kids", Baby)}
            {renderClothingSection("household", HomeIcon)}

            {/* Pickup Details */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pickup Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter pickup address"
                    isInvalid={!!errors.pickupAddress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    isInvalid={!!errors.pickupDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Pickup Time</Form.Label>
                  <Form.Select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    isInvalid={!!errors.pickupTime}
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Delivery Details */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    placeholder="Enter delivery address"
                    isInvalid={!!errors.deliveryAddress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    isInvalid={!!errors.deliveryDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Delivery Time</Form.Label>
                  <Form.Select
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    isInvalid={!!errors.deliveryTime}
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Price Estimation */}
            <div className="text-center mt-5">
              <Button
                variant="outline-primary"
                onClick={() => setShowPriceModal(true)}
                disabled={!formData.serviceType}
              >
                <FaRupeeSign className="me-2" />
                Estimated Total: ₹{calculateTotalPrice.toFixed(2)}
              </Button>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <Button
                size="lg"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#003242",
                }}
              >
                Schedule Pickup
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Price Breakdown Modal */}
        <Modal show={showPriceModal} onHide={() => setShowPriceModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Price Breakdown</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Service Type: {formData.serviceType || "Not selected"}</h5>

            {Object.entries(formData.clothingItems).map(([section, items]) => {
              const sectionItems = Object.entries(items).filter(
                ([_, count]) => count > 0
              );

              if (sectionItems.length === 0) return null;

              return (
                <div key={section} className="mb-3">
                  <h6>
                    {section.charAt(0).toUpperCase() + section.slice(1)} Items:
                  </h6>
                  {sectionItems.map(([itemName, count]) => {
                    const itemPrice = getCurrentPrice(section, itemName);
                    return (
                      <p key={itemName} className="mb-1">
                        {itemName}: {count} x ₹{itemPrice} = ₹
                        {(count * itemPrice).toFixed(2)}
                      </p>
                    );
                  })}
                </div>
              );
            })}

            <h4 className="mt-3 text-right">
              Total: ₹{calculateTotalPrice.toFixed(2)}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPriceModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Footer />
    </div>
  );
};

export default SchedulePickup;
