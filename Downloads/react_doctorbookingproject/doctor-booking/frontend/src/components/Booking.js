import React, { useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

export default function Booking() {
  const { id } = useParams(); // Doctor ID from route (like /book/1)
  const [slot, setSlot] = useState(new Date());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // ✅ Send doctorId as a number
      await api.post(
        "/bookings",
        { doctorId: Number(id), slot },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Booking successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2 className="booking-title">Book Appointment</h2>
        <p className="booking-subtitle">Doctor ID: {id}</p>

        <form onSubmit={handleBooking}>
          <div className="input-group">
            <label>Select Date & Time</label>
            <DatePicker
              selected={slot}
              onChange={(date) => setSlot(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              className="calendar-input"
            />
          </div>

          <button type="submit" className="book-btn" disabled={loading}>
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>

        {message && (
          <p
            className={`message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
