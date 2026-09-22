import React, { useState, useEffect, useCallback } from "react";
import {
  Truck,
  Package,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Edit,
  Save,
  X,
} from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  ListGroup,
  ProgressBar,
  Tabs,
  Tab,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api";
import { FaRupeeSign } from "react-icons/fa";

// Import clothing types data
import clothingTypes from "../catalog.json";

const OrderStatus = () => {
  // State for order data
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderIdInput, setOrderIdInput] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Edit delivery state
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    date: "",
    time: "",
  });
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);

  // Sample status steps for the order process
  const orderStatuses = [
    { id: "placed", label: "Order Placed", color: "primary" },
    { id: "confirmed", label: "Order Confirmed", color: "info" },
    { id: "pickup", label: "Picked Up", color: "secondary" },
    { id: "processing", label: "Processing", color: "warning" },
    { id: "ready", label: "Ready for Delivery", color: "info" },
    { id: "delivered", label: "Delivered", color: "success" },
    { id: "cancelled", label: "Cancelled", color: "danger" },
  ];

  // Initialize delivery edit information when order data changes
  useEffect(() => {
    if (orderData) {
      setDeliveryInfo({
        address: orderData.deliveryAddress,
        date: orderData.deliveryDate,
        time: orderData.deliveryTime,
      });
    }
  }, [orderData]);

  // Auto-update order status based on time
  useEffect(() => {
    if (orderData) {
      calculateCurrentStatus();

      // Set up interval to periodically check and update status
      const statusInterval = setInterval(calculateCurrentStatus, 60000); // Check every minute

      return () => clearInterval(statusInterval);
    }
  }, [orderData]);

  // Function to calculate current status based on time intervals
  const calculateCurrentStatus = () => {
    if (!orderData) return;

    const now = new Date();
    const pickupDate = new Date(orderData.pickupDate);
    const deliveryDate = new Date(orderData.deliveryDate);

    // Parse pickup and delivery time ranges
    const pickupTimeRange = parseTimeRange(orderData.pickupTime);
    const deliveryTimeRange = parseTimeRange(orderData.deliveryTime);

    // Set pickup date hours based on time range
    const pickupStart = new Date(pickupDate);
    pickupStart.setHours(
      pickupTimeRange.start.hours,
      pickupTimeRange.start.minutes
    );

    const pickupEnd = new Date(pickupDate);
    pickupEnd.setHours(pickupTimeRange.end.hours, pickupTimeRange.end.minutes);

    // Set delivery date hours based on time range
    const deliveryStart = new Date(deliveryDate);
    deliveryStart.setHours(
      deliveryTimeRange.start.hours,
      deliveryTimeRange.start.minutes
    );

    const deliveryEnd = new Date(deliveryDate);
    deliveryEnd.setHours(
      deliveryTimeRange.end.hours,
      deliveryTimeRange.end.minutes
    );

    // Calculate the time interval between pickup and delivery
    const totalProcessTime = deliveryStart.getTime() - pickupEnd.getTime();
    const processingMidpoint = new Date(
      pickupEnd.getTime() + totalProcessTime * 0.3
    );
    const readyForDeliveryTime = new Date(
      pickupEnd.getTime() + totalProcessTime * 0.7
    );

    let newStatus = orderData.status;

    // Make sure statusHistory is an array
    let statusHistory = Array.isArray(orderData.statusHistory)
      ? [...orderData.statusHistory]
      : [];

    // Update the status based on current time
    if (now < pickupStart) {
      if (newStatus !== "confirmed") {
        newStatus = "confirmed";
        addStatusHistoryIfNeeded(
          statusHistory,
          newStatus,
          "Your order has been confirmed. Pickup scheduled."
        );
      }
    } else if (now >= pickupStart && now <= pickupEnd) {
      if (newStatus !== "pickup") {
        newStatus = "pickup";
        addStatusHistoryIfNeeded(
          statusHistory,
          newStatus,
          "Your laundry has been picked up by our delivery agent."
        );
      }
    } else if (now > pickupEnd && now <= processingMidpoint) {
      if (newStatus !== "processing") {
        newStatus = "processing";
        addStatusHistoryIfNeeded(
          statusHistory,
          newStatus,
          "Your clothes are being processed at our facility."
        );
      }
    } else if (now > processingMidpoint && now <= readyForDeliveryTime) {
      if (newStatus !== "ready") {
        newStatus = "ready";
        addStatusHistoryIfNeeded(
          statusHistory,
          newStatus,
          "Your laundry is ready for delivery."
        );
      }
    } else if (now > deliveryEnd) {
      if (newStatus !== "delivered") {
        newStatus = "delivered";
        addStatusHistoryIfNeeded(
          statusHistory,
          newStatus,
          "Your laundry has been delivered successfully."
        );
      }
    }

    // Update order data if status has changed
    if (
      newStatus !== orderData.status ||
      statusHistory.length !== (orderData.statusHistory?.length || 0)
    ) {
      setOrderData({
        ...orderData,
        status: newStatus,
        statusHistory: statusHistory,
      });
    }
  };

  // Helper function to parse time range like "9 AM - 12 PM"
  const parseTimeRange = (timeString) => {
    const [startTime, endTime] = timeString.split(" - ");

    return {
      start: parseTime(startTime),
      end: parseTime(endTime),
    };
  };

  // Helper function to parse time like "9 AM" or "3 PM"
  const parseTime = (timeStr) => {
    const isPM = timeStr.includes("PM");
    const hourStr = timeStr.replace(/\s?[AP]M/, "");
    let hours = parseInt(hourStr);

    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    return { hours, minutes: 0 };
  };

  // Helper function to add status to history if it doesn't exist
  const addStatusHistoryIfNeeded = (history, status, message) => {
    const statusExists = history.some((item) => item.status === status);

    if (!statusExists) {
      history.push({
        status,
        timestamp: new Date().toISOString(),
        message,
      });
    }

    return history;
  };

  // Function to fetch order data
  const fetchOrderData = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      // Replace with actual API endpoint for order status
      const response = await axios.get(
        `/api/pickups/${orderId}`
      );

      // If pricing data doesn't exist, generate it
      let orderWithPricing = { ...response.data };

      if (!orderWithPricing.priceBreakdown) {
        const breakdown = generatePriceBreakdown(
          orderWithPricing.clothingItems,
          orderWithPricing.serviceType
        );

        // Calculate total price
        const totalPrice = breakdown.reduce((sum, item) => sum + item.total, 0);

        orderWithPricing.priceBreakdown = breakdown;
        orderWithPricing.totalPrice = response.data.totalPrice ?? totalPrice;
      }

      setOrderData(orderWithPricing);
    } catch (err) {
      console.error("Error fetching order:", err);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      setError(
        `Unable to fetch order: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search submission
  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      fetchOrderData(orderIdInput.trim());
    }
  };

  // Function to handle delivery details update
  const handleUpdateDelivery = async () => {
    setUpdating(true);
    setUpdateMessage(null);

    try {
      // Validate input
      if (
        !deliveryInfo.address.trim() ||
        !deliveryInfo.date ||
        !deliveryInfo.time
      ) {
        throw new Error("Please fill in all delivery details");
      }

      // Check if delivery date is in the future
      const deliveryDate = new Date(deliveryInfo.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deliveryDate < today) {
        throw new Error("Delivery date must be in the future");
      }

      // Try to update on the server
      await axios.patch(
        `/api/pickups/${orderData.orderId}`,
        {
          deliveryAddress: deliveryInfo.address,
          deliveryDate: deliveryInfo.date,
          deliveryTime: deliveryInfo.time,
        }
      );

      // Simulate API call success - update local state
      setOrderData((prevData) => {
        const updatedData = {
          ...prevData,
          deliveryAddress: deliveryInfo.address,
          deliveryDate: deliveryInfo.date,
          deliveryTime: deliveryInfo.time,
          statusHistory: [
            ...(Array.isArray(prevData.statusHistory)
              ? prevData.statusHistory
              : []),
            {
              status: prevData.status,
              timestamp: new Date().toISOString(),
              message: "Delivery details updated by customer.",
            },
          ],
        };

        // Recalculate status after delivery date change
        setTimeout(calculateCurrentStatus, 100);

        return updatedData;
      });

      setUpdateMessage({
        type: "success",
        text: "Delivery details updated successfully!",
      });

      // Close modal after a short delay
      setTimeout(() => {
        setShowEditModal(false);
        setUpdateMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Error updating delivery:", err);
      setUpdateMessage({
        type: "danger",
        text:
          err.message || "Failed to update delivery details. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    setUpdating(true);
    try {
      // API call to cancel order
      await axios.delete(
        `/api/pickups/${orderData.orderId}/cancel`,
        { status: "cancelled" }
      );

      // Update local state
      setOrderData((prevData) => ({
        ...prevData,
        status: "cancelled",
        statusHistory: [
          ...(Array.isArray(prevData.statusHistory)
            ? prevData.statusHistory
            : []),
          {
            status: "cancelled",
            timestamp: new Date().toISOString(),
            message: "Order cancelled by customer.",
          },
        ],
      }));

      setShowCancelModal(false);
      // Show success message
    } catch (err) {
      console.error("Error cancelling order:", err);
      // Show error message
    } finally {
      setUpdating(false);
    }
  };

  // Check if order is editable (only before delivery)
  const isOrderEditable = (status) => {
    const nonEditableStatuses = ["delivered", "cancelled"];
    return !nonEditableStatuses.includes(status);
  };

  // Function to get current status index
  const getCurrentStatusIndex = (status) => {
    return orderStatuses.findIndex((s) => s.id === status);
  };

  // Helper function to find an item's price based on service type
  const findItemPrice = (category, itemName, serviceType) => {
    const categoryItems = clothingTypes[category] || [];
    const itemData = categoryItems.find((item) => item.name === itemName);

    if (itemData && itemData.prices && itemData.prices[serviceType]) {
      return itemData.prices[serviceType];
    }

    // Default price if not found
    return 50;
  };

  // Enhanced function to generate price breakdown from clothing items
  const generatePriceBreakdown = (clothingItems, serviceType) => {
    const breakdown = [];
    let itemsTotal = 0;

    // Process all categories
    Object.entries(clothingItems).forEach(([category, items]) => {
      Object.entries(items).forEach(([itemName, count]) => {
        if (count > 0) {
          const unitPrice = findItemPrice(category, itemName, serviceType);
          const total = unitPrice * count;
          itemsTotal += total;

          breakdown.push({
            item: itemName,
            count,
            unitPrice,
            total,
          });
        }
      });
    });

    // Add service fee (base 50 + 10% of items total)
    const serviceFee = 50 + Math.round(itemsTotal * 0.1);
    breakdown.push({
      item: "Service Fee",
      count: 1,
      unitPrice: serviceFee,
      total: serviceFee,
    });

    return breakdown;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Generate status steps
  const renderStatusSteps = () => {
    if (!orderData) return null;

    const currentIndex = getCurrentStatusIndex(orderData.status);

    return (
      <div className="status-tracker mb-4">
        <ProgressBar
          now={(currentIndex / (orderStatuses.length - 1)) * 100}
          className="mb-3"
          variant="info"
        />

        <Row className="text-center status-steps">
          {orderStatuses.map((status, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <Col key={status.id}>
                <div
                  className={`status-point ${isActive ? "active" : ""} ${
                    isCurrent ? "current" : ""
                  }`}
                  style={{
                    opacity: isActive ? 1 : 0.5,
                    fontWeight: isCurrent ? "bold" : "normal",
                  }}
                >
                  <Badge
                    bg={isActive ? status.color : "secondary"}
                    className="p-2 mb-2"
                  >
                    {index + 1}
                  </Badge>
                  <div>{status.label}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  // Render price breakdown
  const renderPriceBreakdown = () => {
    if (!orderData || !orderData.priceBreakdown) return null;

    return (
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <DollarSign className="me-2" />
          <strong>Price Breakdown</strong>
          <Badge bg="info" className="ms-2" pill>
            {orderData.serviceType}
          </Badge>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {orderData.priceBreakdown.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.item}
                  {item.count > 1 && (
                    <span className="text-muted"> × {item.count}</span>
                  )}
                </div>
                <div>
                  {item.count > 1 && (
                    <small className="text-muted me-2">
                      ₹{item.unitPrice} each
                    </small>
                  )}
                  <strong>₹{item.total.toFixed(2)}</strong>
                </div>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light">
              <strong>Total</strong>
              <strong className="text-primary">
                ₹{orderData.totalPrice.toFixed(2)}
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  // Render clothing items breakdown
  const renderClothingItems = () => {
    if (!orderData || !orderData.clothingItems) return null;

    return (
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <Package className="me-2" />
          <strong>Clothing Items</strong>
        </Card.Header>
        <Card.Body>
          {Object.entries(orderData.clothingItems).map(([section, items]) => {
            const sectionItems = Object.entries(items).filter(
              ([_, count]) => count > 0
            );

            if (sectionItems.length === 0) return null;

            return (
              <div key={section} className="mb-3">
                <h6 className="text-muted">
                  {section.charAt(0).toUpperCase() + section.slice(1)} Items:
                </h6>
                <ListGroup variant="flush">
                  {sectionItems.map(([itemName, count]) => (
                    <ListGroup.Item
                      key={itemName}
                      className="d-flex justify-content-between align-items-center py-2"
                    >
                      <span>{itemName}</span>
                      <div>
                        <Badge bg="secondary" className="me-2">
                          {count}
                        </Badge>
                        <small className="text-muted">
                          (₹
                          {findItemPrice(
                            section,
                            itemName,
                            orderData.serviceType
                          )}{" "}
                          each)
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    );
  };

  // Render status history timeline
  const renderStatusTimeline = () => {
    if (!orderData) return null;

    // Make sure statusHistory is an array
    const statusHistory = Array.isArray(orderData.statusHistory)
      ? orderData.statusHistory
      : [];

    if (statusHistory.length === 0) {
      return (
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center">
            <Clock className="me-2" />
            <strong>Status History</strong>
          </Card.Header>
          <Card.Body>
            <Alert variant="info">No status updates available yet.</Alert>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <Clock className="me-2" />
          <strong>Status History</strong>
        </Card.Header>
        <Card.Body>
          <div className="timeline">
            {statusHistory.map((event, index) => (
              <div
                key={index}
                className="timeline-item mb-3 pb-3 border-bottom"
              >
                <div className="d-flex align-items-center mb-2">
                  <Badge
                    bg={
                      orderStatuses.find((s) => s.id === event.status)?.color ||
                      "primary"
                    }
                    className="me-2"
                  >
                    {orderStatuses.find((s) => s.id === event.status)?.label ||
                      event.status}
                  </Badge>
                  <small className="text-muted">
                    {formatTimestamp(event.timestamp)}
                  </small>
                </div>
                <p className="mb-0">{event.message}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Render order details card
  const renderOrderDetails = () => {
    if (!orderData) return null;

    return (
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <Package className="me-2" />
          <strong>Order Details</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Order ID:</strong> {orderData.orderId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Store:</strong> {orderData.store}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Service:</strong> {orderData.serviceType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Order Date:</strong>{" "}
                  {formatTimestamp(orderData.pickupDate)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-start">
                  <MapPin className="me-2 mt-1" size={16} />
                  <div>
                    <strong>Pickup:</strong>
                    <br />
                    {orderData.pickupAddress}
                    <br />
                    {formatDate(orderData.pickupDate)}, {orderData.pickupTime}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start position-relative">
                  <MapPin className="me-2 mt-1" size={16} />
                  <div>
                    <strong>Delivery:</strong>
                    <br />
                    {orderData.deliveryAddress}
                    <br />
                    {formatDate(orderData.deliveryDate)},{" "}
                    {orderData.deliveryTime}
                  </div>

                  {isOrderEditable(orderData.status) && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="position-absolute top-0 end-0 mt-2 me-2"
                      onClick={() => setShowEditModal(true)}
                    >
                      <Edit size={14} className="me-1" /> Edit
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  // Render edit delivery modal
  const renderEditDeliveryModal = () => {
    return (
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setUpdateMessage(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Delivery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateMessage && (
            <Alert variant={updateMessage.type} className="mb-3">
              {updateMessage.type === "success" ? (
                <CheckCircle className="me-2" size={16} />
              ) : (
                <AlertCircle className="me-2" size={16} />
              )}
              {updateMessage.text}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={deliveryInfo.address}
                onChange={(e) =>
                  setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
                }
                placeholder="Enter delivery address"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={deliveryInfo.date}
                    onChange={(e) =>
                      setDeliveryInfo({ ...deliveryInfo, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Delivery Time</Form.Label>
                  <Form.Select
                    value={deliveryInfo.time}
                    onChange={(e) =>
                      setDeliveryInfo({ ...deliveryInfo, time: e.target.value })
                    }
                  >
                    <option value="">Select time slot</option>
                    <option value="9 AM - 12 PM">Morning (9 AM - 12 PM)</option>
                    <option value="12 PM - 3 PM">
                      Afternoon (12 PM - 3 PM)
                    </option>
                    <option value="3 PM - 6 PM">Evening (3 PM - 6 PM)</option>
                    <option value="6 PM - 9 PM">Night (6 PM - 9 PM)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="info" className="mb-3">
              <small>
                <strong>Note:</strong> You can only extend the delivery date and
                modify delivery details before your order is delivered.
              </small>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEditModal(false);
              setUpdateMessage(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateDelivery}
            disabled={updating}
          >
            {updating ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />{" "}
                Updating...
              </>
            ) : (
              <>
                <Save size={16} className="me-2" /> Save Changes
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderCancelModal = () => {
    return (
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <AlertCircle className="me-2" size={16} />
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>Reason for cancellation (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please tell us why you're cancelling this order"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Back
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelOrder}
            disabled={updating}
          >
            {updating ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />{" "}
                Processing...
              </>
            ) : (
              <>
                <X size={16} className="me-2" /> Cancel Order
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Navbar />

      <Container className="mt-4 mb-4">
        <Card className="shadow mb-4">
          <Card.Header className="bg-info-subtle text-dark text-center">
            <h3 className="mb-0 d-flex justify-content-center align-items-center">
              <Truck className="me-3" /> Track Your Laundry Order
            </h3>
          </Card.Header>
          <Card.Body>
            {/* Order ID search */}
            <Form onSubmit={handleSearchOrder}>
              <Row className="justify-content-center mb-4">
                <Col md={8}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Enter your Order ID"
                      value={orderIdInput}
                      onChange={(e) => setOrderIdInput(e.target.value)}
                      required
                    />
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            size="sm"
                            animation="border"
                            className="me-2"
                          />{" "}
                          Searching...
                        </>
                      ) : (
                        "Track Order"
                      )}
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Form>

            {/* Error message */}
            {error && (
              <Alert variant="danger" className="mb-4">
                <AlertCircle className="me-2" />
                {error}
              </Alert>
            )}

            {/* Order Status Display */}
            {orderData && (
              <>
                {/* Current Status */}
                <div className="text-center mb-4">
                  <Badge
                    bg={
                      orderStatuses.find((s) => s.id === orderData.status)
                        ?.color || "primary"
                    }
                    className="p-2 px-3 fs-6"
                  >
                    {orderStatuses.find((s) => s.id === orderData.status)
                      ?.label || orderData.status}
                  </Badge>

                  <p className="text-muted mt-2">
                    Order ID: {orderData.orderId}
                  </p>
                </div>

                {/* Status Tracker */}
                {renderStatusSteps()}

                {/* Tabs for different sections */}
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab eventKey="details" title="Order Details">
                    {renderOrderDetails()}
                  </Tab>
                  <Tab eventKey="items" title="Clothing Items">
                    {renderClothingItems()}
                  </Tab>
                  <Tab eventKey="price" title="Price Breakdown">
                    {renderPriceBreakdown()}
                  </Tab>
                  <Tab eventKey="history" title="Status History">
                    {renderStatusTimeline()}
                  </Tab>
                </Tabs>

                {/* Action Buttons */}
                <div className="d-flex justify-content-center gap-3">
                  {isOrderEditable(orderData.status) && (
                    <>
                      <Button
                        variant="outline-primary"
                        onClick={() => setShowEditModal(true)}
                      >
                        <Edit className="me-2" size={16} />
                        Update Delivery
                      </Button>

                      {/* Only show cancel button for orders that haven't been delivered or processed yet */}
                      {["placed", "confirmed"].includes(orderData.status) && (
                        <Button
                          variant="outline-danger"
                          onClick={() => setShowCancelModal(true)}
                        >
                          <X className="me-2" size={16} />
                          Cancel Order
                        </Button>
                      )}
                    </>
                  )}

                  <Button
                    variant="primary"
                    onClick={() => {
                      setOrderData(null);
                      setOrderIdInput("");
                    }}
                  >
                    <RefreshCw className="me-2" size={16} />
                    Track Another Order
                  </Button>
                </div>
              </>
            )}
            {/* Empty state - when no order is searched yet */}
            {!orderData && !loading && !error && (
              <div className="text-center p-5">
                <Package size={48} className="mb-3 text-muted" />
                <h4>Track your laundry order</h4>
                <p className="text-muted">
                  Enter your order ID above to see the current status and
                  details of your laundry order.
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Edit Delivery Modal */}
      {renderEditDeliveryModal()}

      {/* Cancel Order Modal */}
      {renderCancelModal()}

      <Alert variant="info" className="mb-0">
        <small>
          <strong>Refund Policy:</strong> Orders cancelled before pickup will
          receive a full refund. Orders cancelled after pickup but before
          processing will incur a 20% service fee. Orders in processing or later
          stages cannot be cancelled.
        </small>
      </Alert>

      <Footer />

      {/* CSS for status steps */}
      <style jsx>{`
        .status-tracker {
          position: relative;
        }
        .status-steps {
          position: relative;
        }
        .status-point {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }
        .status-point.active {
          color: #0d6efd;
        }
        .status-point.current {
          transform: scale(1.1);
        }
        .timeline-item:last-child {
          border-bottom: none !important;
        }

        @media print {
          nav,
          footer,
          button,
          .form-control,
          .input-group {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderStatus;
