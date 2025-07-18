import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import GradientButton from "../../components/GradientButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useWalletStore from "../../stores/walletStore";
import { useLoading } from "../../context/LoaderContext";
import { useUsers } from "../../context/UserContext";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllAccounts } from "../../services/accountService";
import { getAllWithdraws } from "../../services/transactionService";

const schema = yup.object().shape({
  withdraw_account: yup.string().required("Withdraw account is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(10, "Minimum amount is 10")
    .max(1000, "Maximum amount is 1000"),
  fee: yup.number().required(),
});

const Withdraws = () => {
  const [visible, setVisible] = useState(false);
  const [withdrawAccount, setWithdrawAccount] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [selectedWalletAddress, setSelectedWalletAddress] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [calculatedFee, setCalculatedFee] = useState(0);

  const { updateWalletAfterAction } = useWalletStore();
  const { users } = useUsers();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const selectedWithdrawAccount = watch("withdraw_account");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [withdraws] = await Promise.all([getAllWithdraws()]);
      setWithdraws(withdraws);
    } catch (error) {
      toast.error("Failed to fetch withdraw history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setLoading]);

  // 🆕 Auto-fill wallet address when withdraw account changes
  useEffect(() => {
    if (selectedWithdrawAccount && withdrawAccount.length > 0) {
      const selected = withdrawAccount.find(
        (acc) => acc.id.toString() === selectedWithdrawAccount.toString()
      );
      if (selected) {
        setSelectedWalletAddress(selected.wallet_address || "");
      } else {
        setSelectedWalletAddress("");
      }
    } else {
      setSelectedWalletAddress("");
    }
  }, [selectedWithdrawAccount, withdrawAccount]);

  const onSubmit = async (data) => {
    const currentUser = users?.[0];
    try {
      setLoading(true);
      data.user = currentUser.id;
      data.payment_status = "pending";
      data.payment_type = "withdraw";
      const newWithdraw = await updateWalletAfterAction(
        "/payments/",
        data,
        "Withdraw request submitted"
      );
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Transaction failed");
    } finally {
      reset();
      setVisible(false);
      setCalculatedFee(0);
      setSelectedAccount(null);
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      const resp = await getAllAccounts();
      setWithdrawAccount(resp || []);
      setVisible(true);
    } catch (err) {
      toast.error("Failed to load withdraw accounts");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "description", label: "Description", type: "string" },
    { key: "transaction_id", label: "Transaction ID", type: "string" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "fee", label: "Fee", type: "number" },
    { key: "status", label: "Status", type: "status" },
    { key: "withdraw_account", label: "Withdraw Account", type: "string" },
  ];

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Withdraw Money</p>
        <div className="flex gap-2">
          <Button
            className="add-button"
            onClick={() => navigate("/user/withdraw-account")}
          >
            Add Account
          </Button>
          <Button className="add-button focus:ring-0" onClick={handleAdd}>
            Add Withdraw
          </Button>
        </div>
      </div>

      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">
            Add Withdraw
          </div>
        }
        visible={visible}
        onHide={() => {
          setVisible(false);
          reset();
          setSelectedWalletAddress("");
        }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          {/* Withdraw Account */}
          <div className="flex flex-col">
            <label className="whitebg-label">Withdraw Account</label>
            <select
              {...register("withdraw_account")}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedAccount = withdrawAccount.find(
                  (acc) => acc.id === parseInt(selectedId)
                );
                setValue("withdraw_account", selectedId);
                setSelectedAccount(selectedAccount);
              }}
              className="whitebg-input"
            >
              <option value="">Select withdraw account</option>
              {withdrawAccount.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.method_name}
                </option>
              ))}
            </select>
            {errors.withdraw_account && (
              <span className="text-red-500 text-sm mt-1">
                {errors.withdraw_account.message}
              </span>
            )}
            {selectedAccount && (
              <p className="text-xs text-red-500 mt-1">
                Processing Time: 2–24 hours
              </p>
            )}
          </div>

          {/* Wallet Address (Read-only) */}
          {selectedAccount && (
            <div className="flex flex-col">
              <label className="whitebg-label">Wallet Address</label>
              <input
                type="text"
                value={selectedAccount.wallet_address}
                readOnly
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* Amount Field (with $ prefix) */}
          <div className="flex flex-col">
            <label className="whitebg-label">Amount (USDT)</label>
            {/* <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-0.5 text-sm">
                $
              </span>
              <input
                type="number"
                min="10"
                max="1000"
                step="1"
                {...register("amount")}
                onChange={(e) => {
                  const val = parseFloat(e.target.value || 0);
                  const fee = parseFloat((val * 0.05).toFixed(2));
                  setValue("amount", val);
                  setValue("fee", fee);
                  setCalculatedFee(fee);
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
                className="whitebg-input !pl-6 w-full"
              />
            </div> */}
            <div className="flex border border-gray-300 rounded-md shadow-md overflow-hidden  focus-within:border-cyan-500">
              <input
                type="number"
                step="any"
                placeholder="0.00"
                min={10}
                max={1000}
                {...register("amount", { required: true })}
                className="flex-grow p-2.5 focus:outline-none"
              />
              <span className="px-4 py-2 bg-gray-800 text-white text-sm flex items-center">
                USDT
              </span>
            </div>
            {errors.amount && (
              <span className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Fee (Read-only) */}
          <div className="flex flex-col">
            <label className="whitebg-label">Fees</label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm mt-0.5">
                $
              </span>
              <input
                type="text"
                readOnly
                {...register("fee")}
                value={calculatedFee?.toFixed(2) || "0.00"}
                className="!pl-6 whitebg-input"
              />
            </div>
          </div>

          <GradientButton type="submit">Proceed to Withdraw</GradientButton>
        </form>
      </Dialog>

      <div>
        <CustomTable data={withdraws} columns={columns} />
      </div>
    </div>
  );
};

export default Withdraws;
