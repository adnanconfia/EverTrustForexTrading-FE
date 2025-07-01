import axiosInstance from "./axiosInstance";

export const getReferralLog = async () => {
  try {
    const resp = await axiosInstance.get(
      "/transaction-history/?history_type=referral"
    );
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
export const getRefTree = async () => {
  try {
    const resp = await axiosInstance.get("/referral-tree/");
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
