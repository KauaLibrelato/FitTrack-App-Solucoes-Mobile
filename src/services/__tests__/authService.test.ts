import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../infra/api";
import { API_ENDPOINTS } from "../../utils/apis";
import { authService } from "../authService";

jest.mock("../../infra/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const mockResponse = {
        data: {
          token: "mock-token",
          user: { id: "1", username: "testuser", email: "test@example.com" },
        },
      };
      mockedApi.post.mockResolvedValueOnce(mockResponse);

      const credentials = { email: "test@example.com", password: "dummy-password" }; // NOSONAR
      const result = await authService.login(credentials);

      expect(mockedApi.post).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.LOGIN, credentials);
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when login fails", async () => {
      const mockError = {
        response: {
          data: { message: "Invalid credentials" },
        },
      };
      mockedApi.post.mockRejectedValueOnce(mockError);

      const credentials = { email: "test@example.com", password: "wrong-dummy-password" }; // NOSONAR

      await expect(authService.login(credentials)).rejects.toEqual(mockError);
      expect(mockedApi.post).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.LOGIN, credentials);
    });

    it("should handle network errors", async () => {
      const networkError = new Error("Network Error");
      mockedApi.post.mockRejectedValueOnce(networkError);

      const credentials = { email: "test@example.com", password: "dummy-password" }; // NOSONAR

      await expect(authService.login(credentials)).rejects.toThrow("Network Error");
    });
  });

  describe("register", () => {
    it("should register successfully with valid data", async () => {
      mockedApi.post.mockResolvedValueOnce({ data: { success: true } });

      const userData = {
        username: "newuser",
        email: "newuser@example.com",
        password: "dummy-password", // NOSONAR
      };

      await authService.register(userData);

      expect(mockedApi.post).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.REGISTER, userData);
    });

    it("should throw error when registration fails", async () => {
      const mockError = {
        response: {
          data: { message: "Email already exists" },
        },
      };
      mockedApi.post.mockRejectedValueOnce(mockError);

      const userData = {
        username: "newuser",
        email: "existing@example.com",
        password: "dummy-password", // NOSONAR
      };

      await expect(authService.register(userData)).rejects.toEqual(mockError);
    });
  });

  describe("storeAuthData", () => {
    it("should store token and user data in AsyncStorage", async () => {
      const authData = {
        token: "mock-token",
        user: { id: "1", username: "testuser" },
      };

      await authService.storeAuthData(authData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith("accessToken", "mock-token");
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(authData));
    });

    it("should handle storage errors gracefully", async () => {
      const authData = {
        token: "mock-token",
        user: { id: "1", username: "testuser" },
      };
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));

      await expect(authService.storeAuthData(authData)).rejects.toThrow("Storage error");
    });
  });

  describe("getStoredToken", () => {
    it("should return stored token", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("stored-token");

      const token = await authService.getStoredToken();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith("accessToken");
      expect(token).toBe("stored-token");
    });

    it("should return null when no token is stored", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const token = await authService.getStoredToken();

      expect(token).toBeNull();
    });
  });

  describe("clearAuthData", () => {
    it("should clear all stored data", async () => {
      await authService.clearAuthData();

      expect(AsyncStorage.clear).toHaveBeenCalled();
    });

    it("should handle clear errors gracefully", async () => {
      (AsyncStorage.clear as jest.Mock).mockRejectedValueOnce(new Error("Clear error"));

      await expect(authService.clearAuthData()).rejects.toThrow("Clear error");
    });
  });
});
