import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";

const useWalletStore = create((set, get) => ({
  walletList: [], // ✅ Store full wallet array
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
        walletList: wallets, // ✅ Store full array here
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
      await get().fetchWallet(); // ✅ Re-fetch to update walletList
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  resetWalletState: () =>
    set({
      walletList: [],
      profitWallet: 0,
      mainWallet: 0,
      error: null,
    }),
}));

export default useWalletStore;
