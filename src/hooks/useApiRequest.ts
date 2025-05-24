"use client";

import { useState } from "react";
import { Toast } from "toastify-react-native";

interface UseApiRequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

export const useApiRequest = (options: UseApiRequestOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = async (requestFn: () => Promise<any>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();

      if (options.onSuccess) {
        options.onSuccess(result);
      }

      if (options.showSuccessToast && options.successMessage) {
        Toast.success(options.successMessage, "bottom");
      }

      return result;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Erro inesperado";
      setError(errorMessage);

      if (options.onError) {
        options.onError(err);
      }

      if (options.showErrorToast !== false) {
        Toast.error(errorMessage, "bottom");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    executeRequest,
  };
};
