import axiosInstance from "./axiosInstance";

interface UpdateProfileData {
  name: string;
  email: string;
}

export const getProfile = () => axiosInstance.get("/users/profile");

export const updateProfile = (data: UpdateProfileData) =>
  axiosInstance.put("/users/profile", data);
