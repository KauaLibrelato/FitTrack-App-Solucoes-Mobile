import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { JSX, useMemo, useState } from "react";
import { Toast } from "toastify-react-native";
import api from "../../infra/api";
import { AuthContext } from "./AuthContext";
import { ILoginRequestResponse } from "./utils/types";

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

  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      signin,
      signout,
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
