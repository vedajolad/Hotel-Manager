// backend/server/index.js

const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new Database("data.db");

// Create Hotel table if it doesn't exist
db.prepare(`
CREATE TABLE IF NOT EXISTS Hotel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT UNIQUE,
    date TEXT,
    gender TEXT,
    phone TEXT NOT NULL,
    registered_at TEXT
)
`).run();


// =====================
// POST - Add Customer
// =====================
app.post("/customers", (req, res) => {
    const { name, address, date, gender, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            message: "Name and Phone are required"
        });
    }

    const exists = db.prepare(
        "SELECT * FROM Hotel WHERE address=?"
    ).get(address);

    if (exists) {
        return res.status(409).json({
            message: "Address already exists"
        });
    }

    const result = db.prepare(`
        INSERT INTO Hotel
        (name,address,date,gender,phone,registered_at)
        VALUES (?,?,?,?,?,?)
    `).run(
        name,
        address,
        date,
        gender,
        phone,
        new Date().toISOString()
    );

    res.json({
        message: "Customer Added",
        id: result.lastInsertRowid
    });
});


// =====================
// GET - All Customers
// =====================
app.get("/customers", (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    const total = db.prepare(
        `SELECT COUNT(*) AS total
         FROM Hotel
         WHERE name LIKE ?`
    ).get(`%${search}%`).total;

    const data = db.prepare(`
        SELECT *
        FROM Hotel
        WHERE name LIKE ?
        ORDER BY registered_at DESC
        LIMIT ? OFFSET ?
    `).all(`%${search}%`, limit, offset);

    res.json({
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    });
});


// =====================
// GET - Single Customer
// =====================
app.get("/customers/:id", (req, res) => {

    const customer = db.prepare(
        "SELECT * FROM Hotel WHERE id=?"
    ).get(req.params.id);

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.json(customer);
});


// =====================
// UPDATE Customer
// =====================
app.put("/customers/:id", (req, res) => {

    const { name, address, date, gender, phone } = req.body;

    const customer = db.prepare(
        "SELECT * FROM Hotel WHERE id=?"
    ).get(req.params.id);

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    db.prepare(`
        UPDATE Hotel
        SET
        name=?,
        address=?,
        date=?,
        gender=?,
        phone=?
        WHERE id=?
    `).run(
        name,
        address,
        date,
        gender,
        phone,
        req.params.id
    );

    res.json({
        message: "Customer Updated"
    });
});


// =====================
// DELETE Customer
// =====================
app.delete("/customers/:id", (req, res) => {

    db.prepare(
        "DELETE FROM Hotel WHERE id=?"
    ).run(req.params.id);

    res.json({
        message: "Customer Deleted"
    });
});


// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});