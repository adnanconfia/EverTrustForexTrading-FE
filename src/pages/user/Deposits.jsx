import React, { useState, useEffect } from "react";
import CustomTable from "../../components/CustomTable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import GradientButton from "../../components/GradientButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useWalletStore from "../../stores/auth/walletStore";
import { useUsers } from "../../context/UserContext";
import { getAllDeposits, paymentMethod } from "../../services/depositService";
import { useLoading } from "../../context/LoaderContext";
import { toast } from "react-toastify";

// ✅ Yup Schema (No size validation)
const schema = yup.object().shape({
  payment_method: yup.string().required("Payment method is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(50, "Minimum amount is 50"),
  deposit_image: yup
    .array()
    .min(1, "Slip image is required")
    .test("fileType", "Only image files are allowed", (files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      return (
        file &&
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/jpg",
        ].includes(file.type)
      );
    }),
});

const Deposits = () => {
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [deposits, setDeposits] = useState([]);

  const { updateWalletAfterAction } = useWalletStore();
  const { users } = useUsers();
  const { setLoading } = useLoading();

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

  const deposit_image = watch("deposit_image");

  // 🔁 Fetch payment methods on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Run both in parallel
        const [methods, deposits] = await Promise.all([
          paymentMethod(),
          getAllDeposits(),
        ]);

        setPaymentMethods(methods);
        setDeposits(deposits);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  // 🖼️ Update preview on file change
  useEffect(() => {
    if (deposit_image && deposit_image.length > 0) {
      const file = deposit_image[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [deposit_image]);

  // ✅ Form Submit
  const onSubmit = async (data) => {
    const currentUser = users?.[0];
    // data.user = currentUser?.id || null;
    const formData = new FormData();
    formData.append("payment_method", data.payment_method);
    formData.append("deposit_image", data.deposit_image[0]);
    formData.append("amount", data.amount);
    formData.append("user", currentUser?.id || "");
    formData.append("payment_status", "pending");
    formData.append("payment_type", "deposit");

    try {
      setLoading(true);

      const newDeposit = await updateWalletAfterAction(
        "/payments/",
        formData,
        "Deposit request submitted"
      );
      setDeposits((prevDeposits) => [newDeposit, ...prevDeposits]);

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

  const columns = [
    { key: "id", label: "Transaction ID", type: "string" },
    { key: "created", label: "Date", type: "date" },
    { key: "deposit_image", label: "Screenshot", type: "image" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "fee", label: "Fee", type: "amount" },
    { key: "payment_status", label: "Status", type: "status" },
    { key: "payment_method_name", label: "Method", type: "string" },
  ];

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

      {/* Modal Dialog */}
      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">Add Deposit</div>
        }
        visible={visible}
        onHide={() => {
          setVisible(false);
          reset();
          setPreview(null);
        }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Payment Method
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
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              {...register("amount")}
              className="appearance-none bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Slip Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Upload Screenshot
            </label>

            {/* Show upload button only if no file is selected */}
            {!deposit_image?.[0] ? (
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
                  {...register("deposit_image")}
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    setValue("deposit_image", files, { shouldValidate: true });
                  }}
                />
              </div>
            ) : (
              // Show preview and clear button if file is selected
              <div className="relative inline-block mt-2">
                <img
                  src={preview}
                  alt="Slip Preview"
                  className="h-32 object-contain rounded-lg border border-cyan-600"
                />
                {/* Clear (X) button */}
                <button
                  type="button"
                  onClick={() => {
                    setValue("deposit_image", [], { shouldValidate: true });
                    setPreview(null);
                  }}
                  className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2"
                  aria-label="Clear uploaded file"
                >
                  ×
                </button>
              </div>
            )}

            {/* Show validation error */}
            {errors.deposit_image && (
              <span className="text-red-500 text-sm mt-1">
                {errors.deposit_image.message}
              </span>
            )}
          </div>

          <GradientButton type="submit">Proceed to Deposit</GradientButton>
        </form>
      </Dialog>

      {/* Data Table */}
      <div>
        <CustomTable data={deposits} columns={columns} />
      </div>
    </div>
  );
};

export default Deposits;
