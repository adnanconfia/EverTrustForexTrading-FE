import axiosInstance from "./axiosInstance";

export const  getTransction =async()=>{
    try {
    const response = await axiosInstance.get("/transaction-history/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};

export const  getTransctionStats =async()=>{
    try {
    const response = await axiosInstance.get("/transaction-stats/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};