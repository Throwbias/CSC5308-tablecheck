export default function Table({ table_name, capacity, is_occupied, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`table-card ${is_occupied ? "is-occupied" : "is-available"}`}
      aria-label={`${table_name}, ${is_occupied ? "occupied" : "available"}, seats ${capacity}`}
      aria-pressed={is_occupied}
    >
      <span className="table-number">{table_name}</span>
      <span className="table-capacity">Seats {capacity}</span>
      <span className="table-status"><span className="status-dot" />{is_occupied ? "Occupied" : "Available"}</span>
    </button>
  );
}