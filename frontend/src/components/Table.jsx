import React from "react";

export default function Table({ table_name, capacity, is_occupied, onClick }) {
  const bgColor = is_occupied ? "#ef4444" : "#22c55e";

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        padding: "20px",
        borderRadius: "8px",
        color: "white",
        textAlign: "center",
        border: "2px solid #1f2937",
        cursor: "pointer",
      }}
    >
      <h2>{table_name}</h2>
      <p>Seats: {capacity}</p>
      <p>{is_occupied ? "Occupied" : "Available"}</p>
    </button>
  );
}