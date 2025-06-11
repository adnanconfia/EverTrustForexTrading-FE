// src/store/walletStore.js
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance";

const useWalletStore = create((set, get) => ({
  profitWallet: 0,
  mainWallet: 0,
  error: null,

  fetchWallet: async () => {
    try {
      const res = await axiosInstance.get("/wallet/");
      const wallets = res.data;

      const profit = wallets.find(
        (w) => w.name.toLowerCase() === "profit wallet"
      );
      const main = wallets.find((w) => w.name.toLowerCase() === "main wallet");

      set({
        profitWallet: parseFloat(profit?.balance || 0.0),
        mainWallet: parseFloat(main?.balance || 0.0),
        error: null,
      });
    } catch (err) {
      set({ error: err.message });
      toast.error("Failed to load wallet data");
    }
  },

  updateWalletAfterAction: async (actionUrl, payload, successMsg) => {
    try {
      const response = await axiosInstance.post(actionUrl, payload);
      await get().fetchWallet();
      toast.success(successMsg);
      return response.data; // now this will contain the data from the server
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transaction failed");
      throw err; // optionally re-throw so caller can handle
    }
  },
}));

export default useWalletStore;
