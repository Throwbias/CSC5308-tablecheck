import { useState } from 'react';
import Table from "./components/Table";
import MapLegend from "./components/MapLegend";
import LoginScreen from "./components/LoginScreen";
import { useTables } from "./hooks/useTables";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { tables, loading, error, toggleTableStatus, reloadTables } = useTables();

  const availableCount = tables.filter((table) => !table.is_occupied).length;
  const occupiedCount = tables.filter((table) => table.is_occupied).length;

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>TableLogic Host Dashboard</h1>
          <p>Live table status stream</p>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: "10px 16px",
            backgroundColor: "#1f2937",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        <div>Total Tables: {tables.length}</div>
        <div style={{ color: "#22c55e" }}>Available: {availableCount}</div>
        <div style={{ color: "#ef4444" }}>Occupied: {occupiedCount}</div>
      </section>

      <MapLegend />

      {loading && <p>Loading table data...</p>}

      {error && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          <p>{error}</p>
          <button onClick={reloadTables}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          {tables.map((table) => (
            <Table
              key={table.id}
              {...table}
              onClick={() => toggleTableStatus(table)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;