import { useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import GradientButton from "../../components/GradientButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Yup schema with all validations
const schema = yup.object().shape({
  paymentMethod: yup.string().required("Payment method is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(50, "Minimum amount is 50"),
});

const Withdraws = () => {
  const [visible, setVisible] = useState(false);
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
    { key: "description", label: "Description" },
    { key: "transaction_id", label: "Transaction ID" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "Fee" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setVisible(false);
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Withdraws</p>
        <Button
          label="Add Withdraw"
          className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md"
          onClick={() => setVisible(true)}
        />
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
              {...register("withdrawMethod")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg px-4 py-2 text-gray-700"
            >
              <option value="">Select method</option>
              <option value="stripe">USDT</option>
            </select>
            {errors.withdrawMethod && (
              <span className="text-red-500 text-sm mt-1">
                {errors.withdrawMethod.message}
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
        <CustomTable data={[]} columns={columns} />
      </div>
    </div>
  );
};

export default Withdraws;
