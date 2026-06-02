import axiosInstance from "./axiosInstance";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Auth routes are public — no token needed, but axiosInstance is fine to use
export const registerUser = (userData: RegisterData) =>
  axiosInstance.post("/auth/register", userData);

export const loginUser = (userData: LoginData) =>
  axiosInstance.post("/auth/login", userData);
