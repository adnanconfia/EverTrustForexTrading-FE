import axiosInstance from "./axiosInstance";

export const getAlltickets = async () => {
  try {
    const response = await axiosInstance.get("/support-tickets/");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
export const addTickets = async (data) => {
  try {
    const response = await axiosInstance.post("/support-tickets/", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
