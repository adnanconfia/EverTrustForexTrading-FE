import React, { useState, useEffect } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
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
  slipFile: yup
    .mixed()
    .required("Slip image is required")
    .test("fileSize", "File size must be less than 1MB", (value) => {
      return value && value[0] && value[0].size <= 1 * 1024 * 1024; // 1MB
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          value[0].type
        )
      );
    }),
});

const Deposits = () => {
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);

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

  const slipFile = watch("slipFile");

  const columns = [
    { key: "description", label: "Description" },
    { key: "transaction_id", label: "Transaction ID" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "Fee" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
  ];

  useEffect(() => {
    if (!slipFile || slipFile.length === 0) {
      setPreview(null);
      return;
    }
    const file = slipFile[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [slipFile]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setVisible(false);
    setPreview(null);
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Deposits</p>
        <Button
          label="Add Deposit"
          className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md"
          onClick={() => setVisible(true)}
        />
      </div>

      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">Add Deposit</div>
        }
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Payment Method
            </label>
            <select
              {...register("paymentMethod")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg px-4 py-2 text-gray-700"
            >
              <option value="">Select method</option>
              <option value="stripe">USDT</option>
            </select>
            {errors.paymentMethod && (
              <span className="text-red-500 text-sm mt-1">
                {errors.paymentMethod.message}
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

          {/* Upload Slip */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Upload Screenshot
            </label>

            <div className="relative w-full">
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-cyan-500 text-gray-700 rounded-lg cursor-pointer hover:opacity-90 transition duration-300"
              >
                <FaUpload size={18} />
                <span>Select upload screenshot</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                {...register("slipFile")}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setValue("slipFile", e.target.files, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </div>

            {watch("slipFile")?.[0] && (
              <p className="text-sm text-gray-600 mt-1">
                {watch("slipFile")[0].name}
              </p>
            )}

            {errors.slipFile && (
              <span className="text-red-500 text-sm mt-1">
                {errors.slipFile.message}
              </span>
            )}

            {preview && (
              <img
                src={preview}
                alt="Slip Preview"
                className="mt-3 h-32 object-contain rounded-lg border border-cyan-600"
              />
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

export default Deposits;
