import { useState } from "react";
import type { LoginCredentails, RegisterCredentials } from "@/types/auth";
import authService from "@/services/authService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      console.log("Register Data 2:", response);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginCredentails) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);

      console.log("Login Data 2:", response);
    } catch (err) {
      setError("Login credentails incorrect. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, login, isLoading, error };
};
