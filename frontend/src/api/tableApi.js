import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
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