import React, { useState, useEffect } from "react";
import {
  Clock,
  Package,
  Search,
  Filter,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
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
  Form,
  InputGroup,
  Table,
  Dropdown,
  Pagination,
  Modal,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    serviceType: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const ordersPerPage = 10;

  // Status mapping for display
  const statusMap = {
    placed: { label: "Order Placed", color: "primary" },
    confirmed: { label: "Order Confirmed", color: "info" },
    pickup: { label: "Picked Up", color: "secondary" },
    processing: { label: "Processing", color: "warning" },
    ready: { label: "Ready for Delivery", color: "info" },
    delivered: { label: "Delivered", color: "success" },
    cancelled: { label: "Cancelled", color: "danger" },
  };

  // Fetch order history on component mount
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  // Function to fetch order history
  const fetchOrderHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with actual API endpoint for order history
      // In a real implementation, this would include authentication
      const response = await axios.get(
        "/api/pickups/history"
      );

      // Sort orders by date (newest first)
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.pickupDate) - new Date(a.pickupDate)
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError(
        `Unable to fetch order history: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search to orders
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceType.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.status === "all" || order.status === filters.status;

      // Date range filter
      let matchesDateRange = true;
      const orderDate = new Date(order.pickupDate);
      const today = new Date();

      if (filters.dateRange === "last7days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        matchesDateRange = orderDate >= sevenDaysAgo;
      } else if (filters.dateRange === "last30days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        matchesDateRange = orderDate >= thirtyDaysAgo;
      } else if (filters.dateRange === "last3months") {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        matchesDateRange = orderDate >= threeMonthsAgo;
      }

      // Service type filter
      const matchesServiceType =
        filters.serviceType === "all" ||
        order.serviceType === filters.serviceType;

      return (
        matchesSearch && matchesStatus && matchesDateRange && matchesServiceType
      );
    });
  };

  // Get current page orders
  const getCurrentPageOrders = () => {
    const filteredOrders = getFilteredOrders();
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get total items count from order
  const getTotalItemsCount = (clothingItems) => {
    let total = 0;
    if (!clothingItems) return total;

    Object.values(clothingItems).forEach((category) => {
      Object.values(category).forEach((count) => {
        total += count;
      });
    });

    return total;
  };

  // Handle order details view
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination
  const renderPagination = () => {
    const filteredOrders = getFilteredOrders();
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    if (totalPages <= 1) return null;

    const pageItems = [];

    // Add previous button
    pageItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
    );

    // Add page numbers
    for (let number = 1; number <= totalPages; number++) {
      pageItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Add next button
    pageItems.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    );

    return (
      <div className="d-flex justify-content-center mt-4">
        <Pagination>{pageItems}</Pagination>
      </div>
    );
  };

  // Render order details modal
  const renderOrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h5>Order Information</h5>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>
                      <strong>Order ID:</strong>
                    </td>
                    <td>{selectedOrder.orderId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>
                      <Badge
                        bg={statusMap[selectedOrder.status]?.color || "primary"}
                      >
                        {statusMap[selectedOrder.status]?.label ||
                          selectedOrder.status}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Store:</strong>
                    </td>
                    <td>{selectedOrder.store}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Service Type:</strong>
                    </td>
                    <td>{selectedOrder.serviceType}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Price:</strong>
                    </td>
                    <td>₹{selectedOrder.totalPrice?.toFixed(2) || "N/A"}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <h5>Delivery Information</h5>
              <div className="mb-3">
                <div className="d-flex align-items-start">
                  <MapPin size={16} className="me-2 mt-1" />
                  <div>
                    <strong>Pickup:</strong>
                    <br />
                    {formatDate(selectedOrder.pickupDate)},{" "}
                    {selectedOrder.pickupTime}
                    <br />
                    <small>{selectedOrder.pickupAddress}</small>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-start">
                  <MapPin size={16} className="me-2 mt-1" />
                  <div>
                    <strong>Delivery:</strong>
                    <br />
                    {formatDate(selectedOrder.deliveryDate)},{" "}
                    {selectedOrder.deliveryTime}
                    <br />
                    <small>{selectedOrder.deliveryAddress}</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <h5>Clothing Items</h5>
          {selectedOrder.clothingItems && (
            <div>
              {Object.entries(selectedOrder.clothingItems).map(
                ([section, items]) => {
                  const sectionItems = Object.entries(items).filter(
                    ([_, count]) => count > 0
                  );

                  if (sectionItems.length === 0) return null;

                  return (
                    <div key={section} className="mb-3">
                      <h6 className="text-muted">
                        {section.charAt(0).toUpperCase() + section.slice(1)}{" "}
                        Items:
                      </h6>
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th className="text-center">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sectionItems.map(([itemName, count]) => (
                            <tr key={itemName}>
                              <td>{itemName}</td>
                              <td className="text-center">{count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
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
              <Clock className="me-3" /> Order History
            </h3>
          </Card.Header>
          <Card.Body>
            {/* Search and filters */}
            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by order ID, store, or service type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <div className="d-flex gap-2">
                  <Dropdown className="flex-grow-1">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="w-100"
                    >
                      <Filter size={16} className="me-2" />
                      Status:{" "}
                      {filters.status === "all"
                        ? "All"
                        : statusMap[filters.status]?.label || filters.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        active={filters.status === "all"}
                        onClick={() =>
                          setFilters({ ...filters, status: "all" })
                        }
                      >
                        All
                      </Dropdown.Item>
                      {Object.entries(statusMap).map(([key, value]) => (
                        <Dropdown.Item
                          key={key}
                          active={filters.status === key}
                          onClick={() =>
                            setFilters({ ...filters, status: key })
                          }
                        >
                          {value.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="flex-grow-1">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="w-100"
                    >
                      <Calendar size={16} className="me-2" />
                      Date:{" "}
                      {filters.dateRange === "all"
                        ? "All Time"
                        : filters.dateRange === "last7days"
                        ? "Last 7 Days"
                        : filters.dateRange === "last30days"
                        ? "Last 30 Days"
                        : "Last 3 Months"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        active={filters.dateRange === "all"}
                        onClick={() =>
                          setFilters({ ...filters, dateRange: "all" })
                        }
                      >
                        All Time
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.dateRange === "last7days"}
                        onClick={() =>
                          setFilters({ ...filters, dateRange: "last7days" })
                        }
                      >
                        Last 7 Days
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.dateRange === "last30days"}
                        onClick={() =>
                          setFilters({ ...filters, dateRange: "last30days" })
                        }
                      >
                        Last 30 Days
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.dateRange === "last3months"}
                        onClick={() =>
                          setFilters({ ...filters, dateRange: "last3months" })
                        }
                      >
                        Last 3 Months
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="flex-grow-1">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="w-100"
                    >
                      <Package size={16} className="me-2" />
                      Service:{" "}
                      {filters.serviceType === "all"
                        ? "All"
                        : filters.serviceType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        active={filters.serviceType === "all"}
                        onClick={() =>
                          setFilters({ ...filters, serviceType: "all" })
                        }
                      >
                        All
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.serviceType === "Wash & Fold"}
                        onClick={() =>
                          setFilters({ ...filters, serviceType: "Wash & Fold" })
                        }
                      >
                        Wash & Fold
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.serviceType === "Wash & Iron"}
                        onClick={() =>
                          setFilters({ ...filters, serviceType: "Wash & Iron" })
                        }
                      >
                        Wash & Iron
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.serviceType === "Steam Iron"}
                        onClick={() =>
                          setFilters({ ...filters, serviceType: "Steam Iron" })
                        }
                      >
                        Steam Iron
                      </Dropdown.Item>
                      <Dropdown.Item
                        active={filters.serviceType === "Dry Cleaning"}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            serviceType: "Dry Cleaning",
                          })
                        }
                      >
                        Dry Cleaning
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>

            {/* Loading state */}
            {loading && (
              <div className="text-center p-5">
                <Spinner animation="border" role="status" className="mb-3" />
                <p>Loading your order history...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <Alert variant="danger" className="mb-4">
                <AlertCircle className="me-2" />
                {error}
                <div className="mt-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={fetchOrderHistory}
                  >
                    <RefreshCw size={14} className="me-1" /> Try Again
                  </Button>
                </div>
              </Alert>
            )}

            {/* Orders table */}
            {!loading && !error && (
              <>
                {getFilteredOrders().length > 0 ? (
                  <div className="table-responsive">
                    <Table hover bordered className="align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Service</th>
                          <th>Store</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageOrders().map((order) => (
                          <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>
                              <small>{formatDate(order.pickupDate)}</small>
                            </td>
                            <td>{order.serviceType}</td>
                            <td>{order.store}</td>
                            <td className="text-center">
                              {getTotalItemsCount(order.clothingItems)}
                            </td>
                            <td>₹{order.totalPrice?.toFixed(2) || "N/A"}</td>
                            <td>
                              <Badge
                                bg={statusMap[order.status]?.color || "primary"}
                                className="w-100 py-2"
                              >
                                {statusMap[order.status]?.label || order.status}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-2 justify-content-center">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleViewOrderDetails(order)}
                                >
                                  <Eye size={14} /> Details
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <Alert variant="info" className="text-center">
                    <Package size={24} className="mb-3" />
                    <p className="mb-0">
                      No orders found with the selected filters.
                    </p>
                  </Alert>
                )}

                {/* Pagination */}
                {renderPagination()}
              </>
            )}

            {/* Empty state */}
            {!loading && !error && orders.length === 0 && (
              <div className="text-center p-5">
                <Package size={48} className="mb-3 text-muted" />
                <h4>No Order History Found</h4>
                <p className="text-muted">
                  You haven't placed any laundry orders yet.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/new-order")}
                >
                  Place Your First Order
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Order details modal */}
      {renderOrderDetailsModal()}

      <Footer />
    </div>
  );
};

export default OrderHistory;
