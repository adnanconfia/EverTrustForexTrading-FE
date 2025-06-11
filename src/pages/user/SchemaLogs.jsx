import React from "react";
import CustomTable from "../../components/CustomTable";

const SchemaLogs = () => {
  const columns = [
    { key: "icon", label: "Icon", type: "string" },
    { key: "schema", label: "Schema", type: "string" },
    { key: "roi", label: "ROI", type: "string" },
    { key: "profit", label: "Profit", type: "amount" },
    { key: "period_remaining", label: "Period Remaining", type: "string" },
    { key: "capital_black", label: "Capital Black", type: "amount" },
    { key: "timeline", label: "Time Line", type: "string" },
  ];

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All Invested Schemas</p>
      </div>
      <div>
        <CustomTable data={[]} columns={columns} />
      </div>
    </div>
  );
};

export default SchemaLogs;
