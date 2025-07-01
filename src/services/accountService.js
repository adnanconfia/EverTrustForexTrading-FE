import axiosInstance from "./axiosInstance";

export const getAllAccounts = async (id) => {
  try {
    const response = await axiosInstance.get("/withdraw-account/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment methods"
    );
  }
};
export const addAccounts = async (data) => {
  try {
    const response = await axiosInstance.post("/withdraw-account/", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add withdraw account"
    );
  }
};
