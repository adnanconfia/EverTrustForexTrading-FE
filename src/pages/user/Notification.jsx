import React from "react";
import CustomTable from "../../components/CustomTable";

const Notification = () => {
  const columns = [
    { key: "title", label: "Title", type: "string" },
    { key: "details", label: "Details", type: "string" },
    { key: "type", label: "Type", type: "string" },
  ];

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All Notifications</p>
      </div>
      <div className="w-full">
        <CustomTable columns={columns} data={[]}></CustomTable>
      </div>
    </div>
  );
};

export default Notification;
