import axiosInstance from "./axiosInstance";

export const getTransction = async () => {
  try {
    const response = await axiosInstance.get("/transaction-history/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch transections"
    );
  }
};
export const getRecentTransction = async () => {
  try {
    const response = await axiosInstance.get("/recent-transaction-history/");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export const getTransctionStats = async () => {
  try {
    const response = await axiosInstance.get("/transaction-stats/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};
export const getAllWithdraws = async () => {
  try {
    const response = await axiosInstance.get(
      "/transaction-history/?history_type=withdraw"
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};

export const updateAccount = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/withdraw-account/${id}/`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update withdraw account"
    );
  }
};
export const deleteAccount = async (id) => {
  try {
    const response = await axiosInstance.delete(`/withdraw-account/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete withdraw account"
    );
  }
};
