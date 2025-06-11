import axiosInstance from "./axiosInstance";

export const login = async (payload) => {
  try {
    const response = await axiosInstance.post("/login/", payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while logging in"
    );
  }
};
export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.get("/verify-token/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while verifying token"
    );
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
export const forgetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post("/forget-password/", payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while forgetting password"
    );
  }
};
export const resetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post("/reset-password/", payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while resetting password"
    );
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const changePassword = async (payload) => {
  try {
    const response = await axiosInstance.put("/change-password/", payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Error occurred while changing password"
    );
  }
};
