import axios from "axios";
const BASE_URL = "http://localhost:8080/v1";

export default axios.create({
  baseURL: BASE_URL,
});
export const axiosJWT = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
