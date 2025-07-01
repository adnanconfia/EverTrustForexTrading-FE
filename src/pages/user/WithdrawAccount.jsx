import { useEffect, useState } from "react";
import GradientButton from "../../components/GradientButton";
import { Dialog } from "primereact/dialog";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import CustomTable from "../../components/CustomTable";
import { useLoading } from "../../context/LoaderContext";
import { toast } from "react-toastify";
import {
  deleteAccount,
  updateAccount,
} from "../../services/transactionService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../context/UserContext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { addAccounts, getAllAccounts } from "../../services/accountService";
import usePaymentMethodStore from "../../stores/paymentMehodStore";
const schema = yup.object().shape({
  payment_method: yup.string().required("Payment method is required"),
  method_name: yup.string().required("Method name is required"),
  wallet_address: yup.string().required("Wallet address is required"),
});

const WithdrawAccount = () => {
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const { users } = useUsers();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { paymentMethodList, fetchPaymentMethods } = usePaymentMethodStore();

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const account_list = await getAllAccounts();
        await fetchPaymentMethods(setLoading);
        setAccounts(account_list);
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

      if (isEditMode && selectedAccount) {
        // Update existing account
        const updated = await updateAccount(selectedAccount.id, data);

        setAccounts((prev) =>
          prev.map((acc) => (acc.id === updated.id ? updated : acc))
        );
        toast.success("Account updated successfully");
      } else {
        // Add new account
        const response = await addAccounts(data);
        setAccounts((prevAccounts) => [response, ...prevAccounts]);
        toast.success("Account added successfully");
      }

      reset();
      setVisible(false);
      setIsEditMode(false);
      setSelectedAccount(null);
    } catch (err) {
      toast.error(
        isEditMode ? "Failed to update account" : "Failed to add account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (account) => {
    // console.log("Delete account:", account);
    try {
      setLoading(true);
      const response = await deleteAccount(account.id);
      setAccounts((prev) => prev.filter((acc) => acc.id !== account.id));
      toast.success("Account deleted successfully");
    } catch (err) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = (account) => {
    setSelectedAccount(account);
    setIsEditMode(true);
    setVisible(true);

    // Set form values
    setValue(
      "payment_method",
      account.payment_method?.id || account.payment_method
    );
    setValue("method_name", account.method_name);
    setValue("wallet_address", account.wallet_address);
  };

  const columns = [
    { key: "method_name", label: "Method Name", type: "string" },
    { key: "wallet_address", label: "Wallet Address", type: "string" },
  ];
  const actions = [
    {
      label: "Delete",
      onClick: (row) => {
        confirmDialog({
          message: "Are you sure you want to delete this user?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => handleDelete(row),
        });
      },
      className: "text-red-500 hover:underline cursor-pointer",
    },
    {
      label: "Edit",
      onClick: (row) => {
        handleUpdate(row);
      },
      className: "text-cyan-600 hover:underline cursor-pointer",
    },
  ];
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      <ConfirmDialog />

      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Withdraw Accounts</p>
        <div className="flex gap-2">
          {/* <Button
            className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none focus:ring-0"
            onClick={() => navigate("/user/withdraws")}
          >
            Add Withdraw
          </Button> */}
          <Button
            className="bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none focus:ring-0"
            onClick={() => setVisible(true)}
          >
            Add Account
          </Button>
        </div>
      </div>

      <Dialog
        header={
          <div className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Update Withdraw Account" : "Add Withdraw Account"}
          </div>
        }
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-white rounded-xl  shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-3">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Choice Method
            </label>
            <select
              {...register("payment_method")}
              className="w-full border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 rounded-lg px-4 py-2 text-gray-700"
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
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Method Name
            </label>
            <input
              type="text"
              {...register("method_name")}
              className="appearance-none bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg"
            />
            {errors.method_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.method_name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Wallet Address
            </label>
            <input
              type="text"
              {...register("wallet_address")}
              className="appearance-none bg-white border border-gray-300 focus:border-cyan-600 focus:ring-cyan-600 text-gray-800 px-4 py-2 rounded-lg"
            />
            {errors.wallet_address && (
              <span className="text-red-500 text-sm mt-1">
                {errors.wallet_address.message}
              </span>
            )}
          </div>

          <GradientButton type="submit">
            {isEditMode ? "Update Account" : "Add Account"}
          </GradientButton>
        </form>
      </Dialog>

      <div>
        <CustomTable data={accounts} columns={columns} actions={actions} />
      </div>
    </div>
  );
};

export default WithdrawAccount;
