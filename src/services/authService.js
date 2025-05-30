import axiosInstance from "./axiosInstance";

export const login = async (payload) => {
  try {
    const response = await axiosInstance.post("/login/", payload);
    return response.data;
  } catch (error) {
    throw new Error(res?.message || "Error occurred while logging in");
  }
};
export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.get("/verify-token/");
    return response.data;
  } catch (error) {
    throw new Error(res?.message || "Error occurred while verifying token");
  }
};
export const signup = async (payload) => {
  try {
    const response = await axiosInstance.post("/register/", payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while registering"
    );
  }
};
