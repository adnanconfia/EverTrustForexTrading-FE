import React from "react";
import CustomTable from "../../components/CustomTable";

const AllTransaction = () => {
  const columns = [
    { key: "description", label: "Description" },
    { key: "transaction_id", label: "Transaction ID" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "Fee" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
  ];
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All Transactions</p>
      </div>
      <div>
        <CustomTable data={[]} columns={columns} />
      </div>
    </div>
  );
};

export default AllTransaction;
