import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GradientButton from "../../components/GradientButton";
import CustomTable from "../../components/CustomTable";

const exchangeSchema = yup.object().shape({
  fromWallet: yup.string().required("From Wallet is required"),
  toWallet: yup
    .string()
    .required("To Wallet is required")
    .notOneOf([yup.ref("fromWallet")], "From and To Wallet cannot be the same"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(50, "Amount must be at least 50 USDT"),
});

export const WalletExchange = () => {
  const [visible, setVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("profit");
  const selectedWalletLabel =
    selectedWallet === "profit"
      ? "Profit Wallet (0.00 USDT)"
      : "Main Wallet (0.00 USDT)";

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
  };

  const columns = [
    { key: "amount", label: "Amount", type: "amount" },
    { key: "charge", label: "Charge", type: "amount" },
    { key: "status", label: "Status", type: "status" },
    { key: "total", label: "Total", type: "amount" },
    // { key: "method", label: "Method", type: "string" }, // uncomment if needed
  ];

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(exchangeSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setVisible(false);
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Wallet Exchange</p>
        <Button
          className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none focus:ring-0"
          onClick={() => setVisible(true)}
        >
          Exchange
        </Button>
      </div>
      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">Exchange</div>
        }
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              From Wallet
            </label>
            <select
              {...register("fromWallet", { required: true })}
              defaultValue="profit"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="profit">Profit Wallet (0.00 USDT)</option>
              <option value="main">Main Wallet (0.00 USDT)</option>
            </select>
            {errors.fromWallet && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fromWallet.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              To Wallet
            </label>
            <select
              {...register("toWallet", { required: true })}
              defaultValue="main"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="profit">Profit Wallet (0.00 USDT)</option>
              <option value="main">Main Wallet (0.00 USDT)</option>
            </select>
            {errors.toWallet && (
              <p className="text-red-500 text-xs mt-1">
                {errors.toWallet.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Enter Amount:
            </label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <input
                type="number"
                step="any"
                placeholder="0.00"
                {...register("amount", { required: true })}
                className="flex-grow p-2 focus:outline-none"
              />
              <span className="px-4 py-2 bg-gray-800 text-white text-sm flex items-center">
                USDT
              </span>
            </div>
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <GradientButton type="submit">Proceed to Deposit</GradientButton>
        </form>
      </Dialog>
      <div>
        <CustomTable data={[]} columns={columns} />
      </div>
    </div>
  );
};
