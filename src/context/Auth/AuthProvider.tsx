import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginRequestResponse } from "./utils/types";
import { Toast } from "toastify-react-native";
import api from "../../infra/api";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [accessToken, setAccessToken] = useState("");

  // Login
  const signin = async ({ email, password, logged }: ILoginRequestResponse) => {
    await api
      .post("/auth/login", { email, password })
      .then(async (res) => {
        setAccessToken(res.data.token);
        await AsyncStorage.setItem("accessToken", res.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data));
        logged();
      })
      .catch((err: { message: string }) => {
        Toast.error(err.message, "bottom");
      });
  };

  // Logout
  const signout = async () => {
    setAccessToken("");
    AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
