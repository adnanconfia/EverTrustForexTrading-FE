import React from "react";
import CustomTable from "../../components/CustomTable";
import { useUsers } from "../../context/UserContext";
import { CLIENT_URL } from "../../config";

const UserDashboard = () => {
  const columns = [
    { key: "description", label: "Description" },
    { key: "transaction_id", label: "Tranaction ID" },
    { key: "is_email_verified", label: "Email Verified" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "Fee" },
    { key: "status", label: "Status" },
    { key: "gateway", label: "Gateway" },
  ];
  const { users } = useUsers() || {};

  const currentUser = users?.[0];
  console.log("Current User:", currentUser);
  return (
    <div className="flex flex-col   w-full overflow-hidden text-white">
      <div className="flex flex-col md:flex-row   gap-4 w-full h-fit md:h-[170px]">
        {/* Level Box */}
        <div className="rounded-full border-2 border-rose-400 bg-[#002f46] h-[120px] w-[120px] md:h-[170px] md:w-[170px] flex flex-col justify-center items-center">
          <h3 className="font-semibold text-xl text-white">Level 1</h3>
          <p className="text-gray-400">Starter</p>
        </div>

        {/* Referral Box */}
        <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white">
          {/* Header */}
          <div className="border-b border-cyan-600 pb-2 mb-3">
            <p className="font-semibold">Referral URL</p>
          </div>

          {/* Referral input and copy button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={CLIENT_URL + currentUser?.refer_code}
              className="w-full bg-[#001f33] text-white px-4 py-2 rounded-md border border-cyan-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  CLIENT_URL + currentUser?.refer_code
                );
              }}
              className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-md"
            >
              Copy
            </button>
          </div>
          <div>
            <p className="text-gray-300">
              0 peoples are joined by using this URL
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 w-full mt-5">
        <div className="flex justify-center items-center w-full p-3  rounded-md bg-[#002f46] shadow-lg">
          div 1
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 2
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 3
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 4
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 5
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 6
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 7
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 8
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 9
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 10
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 11
        </div>
        <div className="flex justify-center items-center w-full p-3  rounded-md   bg-[#002f46] shadow-lg">
          div 12
        </div>
      </div>
      <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
        {/* Header */}
        <div className="border-b border-cyan-600 pb-2 mb-3">
          <p className="font-semibold">Recent Transactions</p>
        </div>
        <div className="overflow-x-auto">
          <CustomTable
            data={[]}
            columns={columns}
            actions={false}
          ></CustomTable>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
