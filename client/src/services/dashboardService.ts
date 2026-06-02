import axiosInstance from "./axiosInstance";

export const getMySubscriptions = () =>
  axiosInstance.get("/subscriptions/my-subscriptions");
