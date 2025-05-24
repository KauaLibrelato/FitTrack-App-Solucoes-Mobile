import axios from "axios";
import { API_CONFIG, getBaseUrl } from "../utils/apis";

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default api;
