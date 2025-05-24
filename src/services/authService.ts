import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../infra/api";
import { API_ENDPOINTS } from "../utils/apis";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: any;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response?.data;
  },

  async register(userData: RegisterData): Promise<void> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      if (!response?.data) {
        throw new Error("Resposta da API não contém dados");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  },

  async storeAuthData(authData: AuthResponse): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem("accessToken", authData.token),
      AsyncStorage.setItem("user", JSON.stringify(authData)),
    ]);
  },

  async getStoredToken(): Promise<string | null> {
    return AsyncStorage.getItem("accessToken");
  },

  async clearAuthData(): Promise<void> {
    await AsyncStorage.clear();
  },
};
