import { act, renderHook } from "@testing-library/react-native";
import { Toast } from "toastify-react-native";
import { useApiRequest } from "../useApiRequest";

jest.mock("toastify-react-native");
const mockedToast = Toast as jest.Mocked<typeof Toast>;

describe("useApiRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useApiRequest());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.executeRequest).toBe("function");
  });

  it("should handle successful request", async () => {
    const mockResponse = { data: "success" };
    const mockRequestFn = jest.fn().mockResolvedValue(mockResponse);
    const onSuccess = jest.fn();

    const { result } = renderHook(() =>
      useApiRequest({
        onSuccess,
        showSuccessToast: true,
        successMessage: "Operation successful",
      })
    );

    let requestResult: any;
    await act(async () => {
      requestResult = await result.current.executeRequest(mockRequestFn);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(mockResponse);
    expect(mockedToast.success).toHaveBeenCalledWith("Operation successful", "bottom");
    expect(requestResult).toEqual(mockResponse);
  });

  it("should handle request error", async () => {
    const mockError = {
      response: {
        data: { message: "Request failed" },
      },
    };
    const mockRequestFn = jest.fn().mockRejectedValue(mockError);
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useApiRequest({
        onError,
        showErrorToast: true,
      })
    );

    await act(async () => {
      try {
        await result.current.executeRequest(mockRequestFn);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Request failed");
    expect(onError).toHaveBeenCalledWith(mockError);
    expect(mockedToast.error).toHaveBeenCalledWith("Request failed", "bottom");
  });

  it("should handle error without response data", async () => {
    const mockError = new Error("Network error");
    const mockRequestFn = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useApiRequest());

    await act(async () => {
      try {
        await result.current.executeRequest(mockRequestFn);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe("Erro inesperado");
    expect(mockedToast.error).toHaveBeenCalledWith("Erro inesperado", "bottom");
  });

  it("should set loading state correctly during request", async () => {
    const mockRequestFn = jest
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("success"), 100)));

    const { result } = renderHook(() => useApiRequest());

    act(() => {
      result.current.executeRequest(mockRequestFn);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(result.current.loading).toBe(false);
  });

  it("should not show error toast when showErrorToast is false", async () => {
    const mockError = {
      response: {
        data: { message: "Request failed" },
      },
    };
    const mockRequestFn = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useApiRequest({
        showErrorToast: false,
      })
    );

    await act(async () => {
      try {
        await result.current.executeRequest(mockRequestFn);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(mockedToast.error).not.toHaveBeenCalled();
  });

  it("should not show success toast when showSuccessToast is false", async () => {
    const mockResponse = { data: "success" };
    const mockRequestFn = jest.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() =>
      useApiRequest({
        showSuccessToast: false,
        successMessage: "Should not show",
      })
    );

    await act(async () => {
      await result.current.executeRequest(mockRequestFn);
    });

    expect(mockedToast.success).not.toHaveBeenCalled();
  });

  it("should clear error state on new request", async () => {
    const mockError = {
      response: {
        data: { message: "First error" },
      },
    };
    const mockRequestFn1 = jest.fn().mockRejectedValue(mockError);
    const mockRequestFn2 = jest.fn().mockResolvedValue("success");

    const { result } = renderHook(() => useApiRequest());

    await act(async () => {
      try {
        await result.current.executeRequest(mockRequestFn1);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe("First error");

    await act(async () => {
      await result.current.executeRequest(mockRequestFn2);
    });

    expect(result.current.error).toBeNull();
  });
});
