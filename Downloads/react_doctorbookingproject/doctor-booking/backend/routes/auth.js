const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DB_PATH = path.join(__dirname, "..", "db.json");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = bcrypt.hashSync(password, 10);
  db.users.push({ id: Date.now(), email, password: hashed });
  writeDB(db);
  res.json({ message: "User registered" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
