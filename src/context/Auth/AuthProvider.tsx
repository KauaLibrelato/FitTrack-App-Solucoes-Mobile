import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginRequestResponse } from "./utils/types";
import { Toast } from "toastify-react-native";
import api from "../../infra/api";
import { IUser } from "../../utils/types";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<IUser | null>(null);

  // Login
  const signin = async ({ email, password }: ILoginRequestResponse) => {
    await api
      .post("/auth/login", { email, password })
      .then(async (res) => {
        setAccessToken(res.data.token);
        setUser({
          token: res.data.token,
          username: res.data.username,
          profilePicture: res.data.profilePicture,
        });
        await AsyncStorage.setItem("accessToken", res.data.token);
      })
      .catch((err: { message: string }) => {
        Toast.error(err.message, "bottom");
      });
  };

  // Logout
  const signout = async () => {
    AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
