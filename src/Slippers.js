import React, { useEffect, useState } from "react";
import { Button, Form, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Slippers = () => {
    const [slippers, setSlippers] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editStock, setEditStock] = useState("");
    const [editImageUrl, setEditImageUrl] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSlippers();
    }, []);

    const fetchSlippers = async () => {
        const response = await axios.get("http://localhost:4000/slippers");
        setSlippers(response.data);
    };

    const handleAdd = async () => {
        await axios.post("http://localhost:4000/slippers", { name, price, stock, image_url, description });
        fetchSlippers();
        setName(""); setPrice(""); setStock(""); setImageUrl(""); setDescription("");
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/slippers/${id}`);
        fetchSlippers();
    };

    const handleEdit = (slipper) => {
        setEditId(slipper.id);
        setEditName(slipper.name);
        setEditPrice(slipper.price);
        setEditStock(slipper.stock);
        setEditImageUrl(slipper.image_url);
        setEditDescription(slipper.description);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        await axios.put(`http://localhost:4000/slippers/${editId}`, {
            name: editName,
            price: editPrice,
            stock: editStock,
            image_url: editImageUrl,
            description: editDescription,
        });
        fetchSlippers();
        setShowModal(false);
    };

    return (
        <Container className="mt-4">
            <Container style={{ position: "relative" }}>
                <div
                    onClick={() => navigate("/my-orders")}
                    style={{
                        position: "absolute",
                        top: "45px",
                        right: "20px",
                        fontSize: "2.5rem",
                        cursor: "pointer",
                        color: "#28a745",
                        textAlign: "center",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    🛍️
                </div>
            </Container>

            <h2 className="text-center mb-4">Slippers Collection</h2>
            <Form className="mb-4">
                <Row>
                    <Col><Form.Control placeholder="Name" value={name} onChange={e => setName(e.target.value)} /></Col>
                    <Col><Form.Control placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /></Col>
                    <Col><Form.Control placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} /></Col>
                    <Col><Form.Control placeholder="Image URL" value={image_url} onChange={e => setImageUrl(e.target.value)} /></Col>
                    <Col>
                        <Form.Control
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                    <Col><Button variant="primary" onClick={handleAdd}>Add</Button></Col>
                </Row>
            </Form>
            <Row>
                {slippers.map((slipper) => (
                    <Col md={4} key={slipper.id} className="mb-4">
                        <Card className="p-3 text-center shadow-sm">
                            <Card.Img
                                variant="top"
                                src={slipper.image_url || "https://via.placeholder.com/150"}
                                alt={slipper.name || "Slipper Image"}
                                className="mx-auto"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{slipper.name}</Card.Title>
                                <Card.Text>ID: SLIP-{100 + slipper.id}</Card.Text>
                                <Card.Text>Price: ₹{slipper.price}</Card.Text>
                                <Card.Text>Stock: {slipper.stock}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => handleDelete(slipper.id)}>Delete</Button>
                                <Button variant="warning" onClick={() => handleEdit(slipper)}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Slipper</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className="mb-2" placeholder="Name" value={editName} onChange={e => setEditName(e.target.value)} />
                        <Form.Control className="mb-2" placeholder="Price" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
                        <Form.Control className="mb-2" placeholder="Stock" value={editStock} onChange={e => setEditStock(e.target.value)} />
                        <Form.Control className="mb-2" placeholder="Image URL" value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} />
                        <Form.Control
                            className="mb-2"
                            placeholder="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Slippers;
