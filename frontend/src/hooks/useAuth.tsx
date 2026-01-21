import { useState } from "react";
import type { LoginCredentails, RegisterCredentials } from "@/types/auth";
import authService from "@/services/authService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      console.log("Register response:", response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginCredentails): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);
      console.log("Login response:", response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, login, isLoading, error };
};
