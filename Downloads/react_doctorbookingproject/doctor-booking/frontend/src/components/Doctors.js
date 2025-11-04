import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Make sure global styles are imported

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <div className="doctor-page">
      <div className="doctor-container">
        <h2 className="page-title">Available Doctors</h2>

        {doctors.length === 0 ? (
          <p className="loading-text">Loading doctors...</p>
        ) : (
          <div className="doctor-list">
            {doctors.map((doc) => (
              <div className="doctor-card" key={doc.id}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    doc.name
                  )}&background=2575fc&color=fff`}
                  alt={doc.name}
                  className="doctor-avatar"
                />
                <div className="doctor-info">
                  <h3>{doc.name}</h3>
                  <p className="specialty">{doc.specialty}</p>
                  <button
                    className="book-btn"
                    onClick={() => navigate(`/book/${doc.id}`)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
