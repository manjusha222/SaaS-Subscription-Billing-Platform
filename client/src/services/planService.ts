import axiosInstance from "./axiosInstance";

export const getPlans = () => axiosInstance.get("/plans");
