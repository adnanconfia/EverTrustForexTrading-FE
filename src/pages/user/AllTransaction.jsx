import React, { useEffect } from "react";
import CustomTable from "../../components/CustomTable";
import { useLoading } from "../../context/LoaderContext";
import { getTransction } from "../../services/transactionService";
import { toast } from "react-toastify";

const AllTransaction = () => {
  const [transactions, setTransactions] = React.useState([]);
  const { setLoading } = useLoading();
  const columns = [
    { key: "description", label: "Description", type: "string" },
    { key: "transaction_id", label: "Transaction ID", type: "string" },
    { key: "history_type", label: "Type", type: "string" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "fee", label: "Fee", type: "amount" },
    { key: "status", label: "Status", type: "status" },
    // { key: "method", label: "Transaction Method", type: "string" },
  ];
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransction();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [setLoading]);
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All Transactions</p>
      </div>
      <div>
        <CustomTable data={transactions} columns={columns} />
      </div>
    </div>
  );
};

export default AllTransaction;
