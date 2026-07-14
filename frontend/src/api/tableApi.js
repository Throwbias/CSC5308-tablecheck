import axios from "axios";

// Check for a production URL in the environment, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export async function getTables() {
  const response = await api.get("/tables");
  return response.data;
}

export async function updateTableStatus(id, isOccupied) {
  const response = await api.patch(`/tables/${id}`, {
    is_occupied: isOccupied,
  });

  return response.data;
}