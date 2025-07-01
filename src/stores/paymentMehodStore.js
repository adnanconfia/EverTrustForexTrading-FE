// src/store/paymentMethodStore.js
import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";

const usePaymentMethodStore = create((set, get) => ({
  paymentMethodList: [],
  isFetched: false,

  fetchPaymentMethods: async (setLoading) => {
    // Skip fetch if already fetched
    if (get().isFetched) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get("/payment-method/");
      set({
        paymentMethodList: response.data,
        isFetched: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch payment methods"
      );
    } finally {
      setLoading(false);
    }
  },
}));

export default usePaymentMethodStore;
