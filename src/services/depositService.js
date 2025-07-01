import axiosInstance from "./axiosInstance";

export const paymentMethod = async () => {
  try {
    const response = await axiosInstance.get("/payment-method/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};
export const getAllDeposits = async () => {
  try {
    const response = await axiosInstance.get("/payments/?payment_type=deposit");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while fetching deposits"
    );
  }
};
