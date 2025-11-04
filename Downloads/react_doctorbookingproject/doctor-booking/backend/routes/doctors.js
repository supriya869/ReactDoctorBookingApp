const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DB_PATH = path.join(__dirname, "..", "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.doctors);
});

router.get("/:id", (req, res) => {
  const db = readDB();
  const doctor = db.doctors.find((d) => d.id === Number(req.params.id));
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
});

module.exports = router;
