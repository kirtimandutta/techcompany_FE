import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

export async function submitContact(payload) {
  const { data } = await api.post("/api/contact", payload);
  return data;
}
