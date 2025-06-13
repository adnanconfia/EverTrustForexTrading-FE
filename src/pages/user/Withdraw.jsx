import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import GradientButton from "../../components/GradientButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllWithdraws } from "../../services/transactionService";
import { paymentMethod } from "../../services/depositService";
import useWalletStore from "../../stores/walletStore";
import { useLoading } from "../../context/LoaderContext";
import { useUsers } from "../../context/UserContext";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// ✅ Yup schema with all validations
const schema = yup.object().shape({
  payment_method: yup.string().required("Withdraw method is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(50, "Minimum amount is 50"),
});

const Withdraws = () => {
  const [visible, setVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

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

  const columns = [
    { key: "description", label: "Description", type: "string" },
    { key: "transaction_id", label: "Transaction ID", type: "string" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "fee", label: "Fee", type: "number" },
    { key: "status", label: "Status", type: "status" },
    { key: "method", label: "Method", type: "string" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [methods, withdraws] = await Promise.all([
          paymentMethod(),
          getAllWithdraws(),
        ]);

        setPaymentMethods(methods);
        setWithdraws(withdraws);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);
  const onSubmit = async (data) => {
    const currentUser = users?.[0];
    try {
      setLoading(true);
      data.user = currentUser.id;
      const newWithdraw = await updateWalletAfterAction(
        "/withdraw-account/",
        data,
        "Withdraw request submitted"
      );
      setWithdraws((prevWithdraws) => [newWithdraw, ...prevWithdraws]);

      // toast.success("Deposit request submitted!");
      reset();
      setVisible(false);
      setPreview(null);
    } catch (err) {
      toast.error("Failed to submit deposit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Withdraws</p>
        <div className="flex gap-2">
          <Button
            className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none focus:ring-0"
            onClick={() => navigate("/user/withdraw-account")}
          >
            Add Account
          </Button>
          <Button
            className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none focus:ring-0"
            onClick={() => setVisible(true)}
          >
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
        onHide={() => setVisible(false)}
        className="bg-white rounded-xl  shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          {/* withdraw Method */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Withdraw Method
            </label>
            <select
              {...register("payment_method")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg px-4 py-2 text-gray-700"
            >
              <option value="">Select method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
            {errors.payment_method && (
              <span className="text-red-500 text-sm mt-1">
                {errors.payment_method.message}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Amount
            </label>
            <input
              type="number"
              min="50"
              step="1"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              {...register("amount")}
              className="appearance-none bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </span>
            )}
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
