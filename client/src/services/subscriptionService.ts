import axiosInstance from "./axiosInstance";

interface SubscribeData {
  plan_id: number;
}

export const subscribePlan = (subscriptionData: SubscribeData) =>
  axiosInstance.post("/subscriptions", subscriptionData);
