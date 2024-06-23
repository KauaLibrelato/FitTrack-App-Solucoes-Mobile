import axios from "axios";

const ip = "192.168.1.157";
export const urlBackend = `http://${ip}:8080/api/client`;

const api = axios.create({
  baseURL: urlBackend,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    "Content-Type": "application/json",
    "Accept-Encondig": "gzip, deflate, br",
  },
});

export default api;
