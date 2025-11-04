const express = require("express");
const fs = require("fs");
const path = require("path");
const auth = require("../utils/authMiddleware");
const router = express.Router();

const DB_PATH = path.join(__dirname, "..", "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// 📅 Create new booking
router.post("/", auth, (req, res) => {
  const { doctorId, slot } = req.body;
  const db = readDB();

  // ✅ Handle number or string doctor IDs
  const doctor = db.doctors.find(
    (d) => d.id === doctorId || d.id === Number(doctorId)
  );

  if (!doctor) {
    console.log("❌ Doctor not found for ID:", doctorId);
    return res.status(404).json({ message: "Doctor not found" });
  }

  const taken = db.bookings.find(
    (b) => b.doctorId === doctorId && b.slot === slot
  );
  if (taken) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  const booking = {
    id: Date.now(),
    doctorId,
    slot,
    userId: req.user.id,
  };

  db.bookings.push(booking);
  writeDB(db);

  res.json({ message: "Booking successful!", booking });
});

// 👩‍⚕️ Get logged-in user's bookings
router.get("/mine", auth, (req, res) => {
  const db = readDB();
  const myBookings = db.bookings
    .filter((b) => b.userId === req.user.id)
    .map((b) => {
      const doctor = db.doctors.find((d) => d.id === b.doctorId);
      return {
        ...b,
        doctorName: doctor ? doctor.name : "Unknown",
        specialty: doctor ? doctor.specialty : "N/A",
      };
    });

  res.json(myBookings);
});

module.exports = router;
