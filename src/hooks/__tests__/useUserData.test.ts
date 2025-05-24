import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-native";
import { useUserData } from "../useUserData";

describe("useUserData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useUserData());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(typeof result.current.updateUserData).toBe("function");
    expect(typeof result.current.clearUserData).toBe("function");
    expect(typeof result.current.refreshUserData).toBe("function");
  });

  it("should load user data from AsyncStorage on mount", async () => {
    const mockUser = {
      username: "testuser",
      token: "mock-token",
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUser));

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("user");
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it("should handle missing user data gracefully", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle AsyncStorage errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(consoleSpy).toHaveBeenCalledWith("Error loading user data:", expect.any(Error));
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);

    consoleSpy.mockRestore();
  });

  it("should update user data correctly", async () => {
    const initialUser = {
      username: "testuser",
      token: "mock-token",
    };
    const updatedData = {
      username: "updateduser",
    };
    const expectedUser = {
      ...initialUser,
      ...updatedData,
    };

    // Primeira chamada: no carregamento inicial
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(initialUser));
    // Segunda chamada: quando updateUserData tentar pegar o usuário novamente (caso o hook faça isso)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(initialUser));
    (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useUserData());

    // Aguarda carregamento inicial
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Atualiza os dados
    await act(async () => {
      await result.current.updateUserData(updatedData);
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("user");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(expectedUser));
    expect(result.current.user).toEqual(expectedUser);
  });

  it("should handle update errors gracefully", async () => {
    const initialUser = {
      username: "testuser",
      token: "mock-token",
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(initialUser));
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // aguarda o carregamento inicial
    });

    await act(async () => {
      await result.current.updateUserData({ username: "newuser" });
    });

    expect(consoleSpy).toHaveBeenCalledWith("Error updating user data:", expect.any(Error));

    consoleSpy.mockRestore();
  });

  it("should clear user data correctly", async () => {
    const mockUser = {
      username: "testuser",
      token: "mock-token",
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUser));

    const { result } = renderHook(() => useUserData());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);

    // Clear user data
    await act(async () => {
      await result.current.clearUserData();
    });

    expect(AsyncStorage.clear).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });

  it("should handle clear errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (AsyncStorage.clear as jest.Mock).mockRejectedValueOnce(new Error("Clear error"));

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await result.current.clearUserData();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Error clearing user data:", expect.any(Error));

    consoleSpy.mockRestore();
  });

  it("should refresh user data correctly", async () => {
    const mockUser = {
      username: "testuser",
      token: "mock-token",
    };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUser));

    const { result } = renderHook(() => useUserData());

    await act(async () => {
      await result.current.refreshUserData();
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("user");
    expect(result.current.user).toEqual(mockUser);
  });
});
