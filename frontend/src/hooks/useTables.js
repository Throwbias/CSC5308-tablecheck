import { useEffect, useState } from "react";
import { getTables, updateTableStatus } from "../api/tableApi";

export function useTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true); // Initialized to true to prevent cascading renders
  const [error, setError] = useState("");

  // Default isReload to true for manual refreshes
  async function loadTables(isReload = true) {
    try {
      if (isReload) {
        setLoading(true);
      }
      setError("");

      const tableData = await getTables();
      setTables(tableData);
    } catch (err) {
      // Option 2: Log the error for developers, show generic message to users
      console.error("Table fetch failed:", err);
      setError("Unable to load table data. Please check the backend connection.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleTableStatus(table) {
    try {
      setError("");

      const updatedTable = await updateTableStatus(table.id, !table.is_occupied);

      setTables((currentTables) =>
        currentTables.map((item) =>
          item.id === updatedTable.id ? updatedTable : item
        )
      );
    } catch (err) {
      // Option 2: Log the error for developers, show generic message to users
      console.error("Table status update failed:", err);
      setError("Unable to update table status. Please try again.");
    }
  }

  useEffect(() => {
    // Pass false on initial mount to prevent the immediate re-render loop
    loadTables(false);
  }, []);

  return {
    tables,
    loading,
    error,
    toggleTableStatus,
    reloadTables: loadTables,
  };
}