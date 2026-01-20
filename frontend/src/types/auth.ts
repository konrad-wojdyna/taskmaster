export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginCredentails {
  usernameOrEmail: string;
  password: string;
}
