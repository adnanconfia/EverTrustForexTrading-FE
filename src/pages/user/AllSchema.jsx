import React, { useEffect } from "react";
import { CiTrophy } from "react-icons/ci";
import { LuTrophy } from "react-icons/lu";
import useSchemaStore from "../../stores/useSchemaStore";
import { useLoading } from "../../context/LoaderContext";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useWalletStore from "../../stores/walletStore";
import { paymentMethod } from "../../services/depositService";
import { FaUpload } from "react-icons/fa";

const schemaForm = yup.object().shape({
  schema: yup.string().required("Schema is required"),
  wallet: yup.string().required("Wallet selection is required"),

  // amount: yup
  //   .number()
  //   .typeError("Amount must be a number")
  //   .required("Amount is required"),
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
  payment_method: yup.string().required("Payment method is required"),
});
const AllSchema = () => {
  const { schemaData, fetchSchemaData } = useSchemaStore();
  const { setLoading } = useLoading();
  const { walletList, fetchWalletList } = useWalletStore(); // assuming fetchWalletList exists

  const [selectedSchema, setSelectedSchema] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [paymentMethodList, setPaymentMethodList] = React.useState([]); // ✅ FIXED

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    mode: "onChange",
  });

  const deposit_image = watch("deposit_image");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchSchemaData();
        const paymentMethods = await paymentMethod();
        setPaymentMethodList(paymentMethods);
        await fetchWalletList; // ✅ correct function
      } catch (err) {
        toast.error(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchSchemaData, setLoading]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Form Data:", data);
      // Submit API call here
      toast.success("Investment submitted successfully");
      reset();
      setVisible(false);
      setPreview(null);
    } catch (err) {
      toast.error(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All The Schemas</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-5">
        {schemaData?.map((schema) => (
          <div
            key={schema.id}
            className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400
      transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            <div className="w-full flex justify-end">
              <div className="bg-gradient-to-r from-rose-400 to-cyan-500 text-white px-2 py-0.5 rounded">
                <p className="text-sm font-bold">
                  Daily Profit Range: {schema.daily_profit_range}
                </p>
              </div>
            </div>
            <div>
              <LuTrophy className="text-5xl font-bold text-cyan-500" />
            </div>
            <div className="flex flex-col mt-3">
              <h2 className="text-2xl font-semibold text-white">
                {schema.schema_name}
              </h2>
              <p className="text-sm text-yellow-500 font-bold">
                Daily {schema.daily_profit}%
              </p>
            </div>
            <div className="">
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">Investment</p>
                <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                  ${schema.investment}
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">Capital Back</p>
                <p className="text-sm text-white font-semibold">
                  {schema.capital_back}
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">Return Type</p>
                <p className="text-sm text-white font-semibold">
                  {schema.return_type}
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">
                  Number of Period
                </p>
                <p className="text-sm text-white font-semibold">
                  {schema.number_of_periods} Times
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">
                  Profit Withdraw
                </p>
                <p className="text-sm text-white font-semibold">
                  {schema.profit_withdraw}
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-sm text-white font-semibold">Cancel</p>
                <p className="text-sm text-white font-semibold">
                  {schema.cancel}
                </p>
              </div>
              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-xs text-yellow-500 font-semibold">
                  * Saturday, Sunday are Holidays
                </p>
              </div>
              <div className="py-3">
                <button
                  type="button"
                  className="w-full mt-6 text-white py-3 rounded-md 
            bg-gradient-to-r from-rose-400 to-cyan-500 
            hover:from-rose-400 hover:to-rose-400
            transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
                  onClick={() => {
                    setVisible(true), setSelectedSchema(schema);
                    setValue("schema", schema.id, { shouldValidate: true });
                  }}
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Dialog */}
      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">
            Review and Confirm Investment
          </div>
        }
        visible={visible}
        onHide={() => {
          setVisible(false);
          reset();
          setPreview(null);
        }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              className="bg-gray-400 border-none hover:bg-gray-500 py-2 px-3 rounded-md focus:outline-none"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="investment-form"
              className="add-button focus:outline-none"
            >
              Confirm
            </Button>
          </div>
        }
      >
        <form
          id="investment-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mt-3"
        >
          {/* Schema Selection */}
          <div className="flex flex-col">
            <label className="whitebg-label">Select Schema</label>
            <select
              {...register("schema")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg ps-2 py-2 text-gray-700"
              onChange={(e) => {
                const schema = schemaData.find(
                  (s) => s.id === Number(e.target.value)
                );
                setSelectedSchema(schema);
                setValue("schema", e.target.value, { shouldValidate: true });
              }}
              value={watch("schema") || ""}
            >
              {schemaData?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.schema_name}
                </option>
              ))}
            </select>
            {errors.schema && (
              <span className="text-red-500 text-sm mt-1">
                {errors.schema.message}
              </span>
            )}
          </div>

          {/* Wallet Selection */}
          <div className="flex flex-col">
            <label className="whitebg-label">Select Wallet</label>
            <select
              {...register("wallet")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg ps-2 py-2 text-gray-700"
              onChange={(e) =>
                setValue("wallet", e.target.value, { shouldValidate: true })
              }
              value={watch("wallet") || ""}
            >
              <option value="">Select a wallet</option>
              {walletList?.map((wallet) => (
                <option
                  key={wallet.id}
                  value={wallet.id}
                  className="capitalize"
                >
                  {wallet.name} ({wallet.balance} USDT)
                </option>
              ))}
              <option value="direct">Direct Gateway</option>
            </select>
            {errors.wallet && (
              <span className="text-red-500 text-sm mt-1">
                {errors.wallet.message}
              </span>
            )}
          </div>

          {/* Conditionally show Direct Gateway upload fields */}
          {watch("wallet") === "direct" && (
            <>
              {/* Upload Screenshot */}
              <div className="flex flex-col mt-4">
                <label className="whitebg-label">Upload Screenshot</label>
                {!deposit_image?.[0] ? (
                  <div className="relative w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-cyan-500 text-gray-700 rounded-lg cursor-pointer hover:opacity-90 transition"
                    >
                      <FaUpload size={18} />
                      <span>Select upload screenshot</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("deposit_image")}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setValue("deposit_image", files, {
                          shouldValidate: true,
                        });

                        // Generate preview
                        const file = files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => setPreview(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative inline-block mt-2">
                    <img
                      src={preview}
                      alt="Slip Preview"
                      className="h-32 object-contain rounded-lg border border-cyan-600"
                    />
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
                {errors.deposit_image && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.deposit_image.message}
                  </span>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="flex flex-col mt-4">
                <label className="whitebg-label">Payment Method</label>
                <select
                  {...register("payment_method")}
                  className="whitebg-input"
                >
                  <option value="">Select method</option>
                  {paymentMethodList.map((method) => (
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
            </>
          )}

          {/* Selected Schema Details */}
          {selectedSchema && (
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Profit Holiday:</strong> Saturday, Sunday
              </p>
              <p>
                <strong>Investment:</strong> {selectedSchema.investment} USDT
              </p>
              <p>
                <strong>Return:</strong> {selectedSchema.daily_profit}% (Daily)
              </p>
              <p>
                <strong>Number of Period:</strong>{" "}
                {selectedSchema.number_of_periods} Times
              </p>
              <p>
                <strong>Capital Back:</strong> {selectedSchema.capital_back}
              </p>
              <p>
                <strong>Total Investment:</strong> {selectedSchema.investment}{" "}
                USDT
              </p>
            </div>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default AllSchema;
