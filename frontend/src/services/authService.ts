import type {
  AuthResponse,
  LoginCredentails,
  RegisterCredentials,
} from "@/types/auth";
import api from "./api";

class AuthService {
  /**
   * Login user
   * POST /api/v1/auth/login
   *
   * @param credentials
   * @returns
   */
  async login(credentials: LoginCredentails): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);

      console.log("[AuthService] Login response: ", response);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  /**
   * Register user
   * POST /api/v1/auth/register
   * @param credentials
   * @returns
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/register",
        credentials,
      );

      console.log("[AuthService] Register response: ", response);

      return response.data;
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  }
}

export default new AuthService();
