import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Doctors from "./components/Doctors";
import Booking from "./components/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
        <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
        <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
        <Link to="/doctors">Doctors</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book/:id" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}
