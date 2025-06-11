import React from "react";
import CustomTable from "../../components/CustomTable";

const SchemaLogs = () => {
  const columns = [
    { key: "icon", label: "Icon" },
    { key: "schema", label: "Schema" },
    { key: "roi", label: "ROI" },
    { key: "profit", label: "Profit" },
    { key: "period_remaining", label: "Period Remaining" },
    { key: "capital_black", label: "Capital Black" },
    { key: "timeline", label: "Time Line" },
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
