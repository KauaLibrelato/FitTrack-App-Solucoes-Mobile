import { type JSX, useMemo, useState } from "react";
import { Toast } from "toastify-react-native";
import { authService } from "../../services/authService";
import { AuthContext } from "./AuthContext";
import type { ILoginRequestResponse } from "./utils/types";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [accessToken, setAccessToken] = useState("");

  // Login
  const signin = async ({ email, password, logged }: ILoginRequestResponse) => {
    try {
      const authData = await authService.login({ email, password });
      setAccessToken(authData.token);
      await authService.storeAuthData(authData);
      logged();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Erro ao fazer login";
      Toast.error(errorMessage, "bottom");
      throw err;
    }
  };

  // Logout
  const signout = async () => {
    setAccessToken("");
    await authService.clearAuthData();
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
