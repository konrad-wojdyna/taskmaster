import type { LoginCredentails, RegisterCredentials } from "@/types/auth";
import { useState } from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Register Data", data);
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
      console.log("Login Data", data);
    } catch (err) {
      setError("Login credentails incorrect. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, login, isLoading, error };
};
