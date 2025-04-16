const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass@3264",
    database: "product",
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL");
});

// GET all slippers
app.get("/slippers", (req, res) => {
    db.query("SELECT * FROM slippers1 ORDER BY id ASC", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// GET single slipper by ID (for order page)
app.get("/slippers/:id", (req, res) => {
    const slipperId = req.params.id;
    db.query("SELECT * FROM slippers1 WHERE id = ?", [slipperId], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch slipper" });
        if (result.length === 0) return res.status(404).json({ message: "Slipper not found" });
        res.json(result[0]);
    });
});

// ADD a slipper
app.post("/slippers", (req, res) => {
    const { name, price, stock, image_url, description } = req.body;
    db.query(
        "INSERT INTO slippers1 (name, price, stock, image_url, description) VALUES (?, ?, ?, ?, ?)",
        [name, price, stock, image_url, description],
        (err, result) => {
            if (err) return res.json({ error: err.message });
            res.json({ message: "Slipper added" });
        }
    );
});

// UPDATE a slipper
app.put("/slippers/:id", (req, res) => {
    const slipperId = req.params.id;
    const { name, price, stock, image_url, description } = req.body;
    const updateQuery = `
        UPDATE slippers1 
        SET name = ?, price = ?, stock = ?, image_url = ?, description = ?
        WHERE id = ?
    `;

    db.query(updateQuery, [name, price, stock, image_url, description, slipperId], (err, result) => {
        if (err) return res.status(500).json({ error: "Update failed" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Slipper not found!" });
        res.json({ message: "Slipper updated successfully!" });
    });
});

// DELETE a slipper
app.delete("/slippers/:id", (req, res) => {
    db.query("DELETE FROM slippers1 WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.json({ error: err.message });
        res.json({ message: "Slipper deleted" });
    });
});

// GET all orders
app.get("/api/orders/my-orders", (req, res) => {
    const sql = "SELECT * FROM orders2 ORDER BY order_date DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Failed to fetch orders" });
        }
        res.json(result);
    });
});


// Start Server
app.listen(4000, () => console.log("Server running on port 4000"));
