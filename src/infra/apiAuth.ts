import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ip = "10.32.6.9";
export const urlBackend = `http://${ip}:8080/api/client`;

const apiAuth = axios.create({
  baseURL: urlBackend,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    "Content-Type": "application/json",
    "Accept-Encondig": "gzip, deflate, br",
  },
});

apiAuth.interceptors.request.use(
  async (req) => {
    const token = await AsyncStorage.getItem("accessToken");

    // @ts-ignore
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error: any) => Promise.reject(error)
);

export default apiAuth;
