import { useState } from 'react';
import Table from "./components/Table";
import MapLegend from "./components/MapLegend";
import LoginScreen from "./components/LoginScreen";
import { useTables } from "./hooks/useTables";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { tables, loading, error, toggleTableStatus, reloadTables } = useTables();

  // 1. CREATE A GUARANTEED ARRAY
  // If tables is an array, use it. If it's undefined, null, or an object, use an empty array []
  const safeTables = Array.isArray(tables) ? tables : [];

  // 2. USE THE GUARANTEED ARRAY FOR YOUR COUNTS
  const availableCount = safeTables.filter((table) => !table.is_occupied).length;
  const occupiedCount = safeTables.filter((table) => table.is_occupied).length;

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div className="brand-lockup"><span className="brand-mark" aria-hidden="true">TL</span><div><p className="eyebrow">Front of house</p><h1>TableLogic</h1></div></div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="text-button"
        >
          Logout
        </button>
      </header>

      <section className="welcome-row">
        <div><p className="eyebrow">Live overview</p><h2>Tonight's dining room</h2><p className="muted-copy">Keep an eye on every table from one place.</p></div>
        <div className="live-indicator"><span className="live-dot" /> Live status</div>
      </section>
      <section className="summary-grid" aria-label="Table summary">
        <div className="summary-card"><span className="summary-label">Total tables</span><strong>{safeTables.length}</strong></div>
        <div className="summary-card summary-card-available"><span className="summary-label">Available now</span><strong>{availableCount}</strong></div>
        <div className="summary-card summary-card-occupied"><span className="summary-label">Occupied</span><strong>{occupiedCount}</strong></div>
      </section>
      <section className="floor-plan-section"><div className="section-heading"><div><p className="eyebrow">Dining room</p><h2>Floor plan</h2></div><MapLegend /></div>
      {loading && <p className="status-message">Loading table data...</p>}

      {error && (
        <div
          className="error-message"
        >
          <p>{error}</p>
          <button className="small-button" onClick={reloadTables}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div className="table-grid">
          {safeTables.map((table) => (
            <Table
              key={table.id}
              {...table}
              onClick={() => toggleTableStatus(table)}
            />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}

export default App;