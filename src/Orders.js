import React, { useEffect, useState } from "react";
import { Container, Card, Alert, Spinner, Row, Col, Badge } from "react-bootstrap";
import { FaBoxOpen, FaRupeeSign, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my-orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setOrders(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📦 My Orders</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {orders.length > 0 ? (
        <Row className="g-3">
          {orders.map((order, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center">
                    <FaBoxOpen className="me-2 text-primary" /> {order.name}
                  </Card.Title>
                  <Card.Text>
                    <FaRupeeSign className="text-success" /> <strong>Price:</strong>{" "}
                    <Badge bg="success">₹{order.price}</Badge>
                    <br />
                    <FaShoppingCart className="text-warning" /> <strong>Quantity:</strong>{" "}
                    <Badge bg="warning">{order.quantity}</Badge>
                    <br />
                    <strong>Total:</strong> ₹{order.price * order.quantity}
                    <br />
                    <FaCalendarAlt className="text-info" /> <strong>Order Date:</strong>{" "}
                    {new Date(order.order_date).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No orders found.</Alert>
      )}
    </Container>
  );
};

export default MyOrders;
