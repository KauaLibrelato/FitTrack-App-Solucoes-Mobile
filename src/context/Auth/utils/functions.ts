import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../infra/api";

import { ILoginRequest } from "./types";

export const loginRequest = async ({ email, password }: ILoginRequest) => {
  const request = await api.post("/auth/login", {
    email,
    password,
  });

  return request.data;
};

export const setToken = async ({ token }: { token: string }) => {
  AsyncStorage.setItem("accessToken", token);
};
