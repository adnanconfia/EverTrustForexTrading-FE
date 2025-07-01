import axiosInstance from "./axiosInstance";

export const updateUserProfile = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/user-profile/${id}/`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update");
  }
};
