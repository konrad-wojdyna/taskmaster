import { useState } from "react";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";
import authService from "@/services/authService";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { setAuth, logout: clearAuth } = useAuthStore();

  const register = async (data: RegisterCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);

      const { accessToken, user } = response;
      if (accessToken && user) {
        setAuth(accessToken, user);
      }

      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);

      const { accessToken, user } = response;
      if (accessToken && user) {
        setAuth(accessToken, user);
      }

      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return { register, login, logout, isLoading, error };
};
