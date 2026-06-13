import { useEffect, useState } from "react";
import { getTables, updateTableStatus } from "../api/tableApi";

export function useTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTables() {
    try {
      setLoading(true);
      setError("");

      const tableData = await getTables();
      setTables(tableData);
    } catch (err) {
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
      setError("Unable to update table status. Please try again.");
    }
  }

  useEffect(() => {
    loadTables();
  }, []);

  return {
    tables,
    loading,
    error,
    toggleTableStatus,
    reloadTables: loadTables,
  };
}