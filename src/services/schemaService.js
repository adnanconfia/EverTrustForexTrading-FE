// services/schemaService.js

import axiosInstance from "./axiosInstance";

export const getSchemaDetails = async () => {
  try {
    const response = await axiosInstance.get("/schema/schemas-details/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch schema details"
    );
  }
};
