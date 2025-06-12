import React, { use, useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { useUsers } from "../../context/UserContext";
import { CLIENT_URL } from "../../config";
import {
  getTransction,
  getTransctionStats,
} from "../../services/transactionService";
import { PiFilePlus } from "react-icons/pi";

import { useLoading } from "../../context/LoaderContext";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const columns = [
    { key: "description", label: "Description", type: "string" },
    { key: "transaction_id", label: "Transaction ID", type: "string" },
    { key: "history_type", label: "Type", type: "string" },
    { key: "amount", label: "Amount", type: "amount" },
    { key: "fee", label: "Fee", type: "amount" },
    { key: "status", label: "Status", type: "status" },
  ];

  const { users } = useUsers() || {};
  const [deposits, setDeposits] = useState([]);
  const [statsData, setStatsData] = useState(null);

  const { setLoading } = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Call both APIs
        const [depositsData, transactionStats] = await Promise.all([
          getTransction(),
          getTransctionStats(),
        ]);

        setDeposits(depositsData); // store deposits in state
        setStatsData(transactionStats);
      } catch (error) {
        toast.error(error.message || "Failed to load data");
      } finally {
        setLoading(false); // loader stops after both API calls finish
      }
    };

    fetchData();
  }, []);

  const currentUser = users?.[0];
  // console.log("Current User:", currentUser);
  return (
    <div className="flex flex-col   w-full overflow-hidden text-white">
      <div className="flex flex-col md:flex-row   gap-4 w-full h-fit md:h-[170px]">
        {/* Level Box */}
        <div className="rounded-full border-2 border-rose-400 bg-[#002f46] h-[120px] w-[120px] md:h-[170px] md:w-[170px] flex flex-col justify-center items-center">
          <h3 className="font-semibold text-xl text-white">
            Level {currentUser?.level}
          </h3>
          <p className="text-gray-400">{currentUser.level_name}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 w-full mt-5">
        {[
          { value: statsData?.all_transaction_count, label: "All Transaction" },
          { value: statsData?.ranked, label: "Ranked" },
          { value: statsData?.total_deposit, label: "Total Deposit" },
          { value: statsData?.total_withdraw, label: "Total Withdraw" },
          { value: statsData?.total_investment, label: "Total Investment" },
          { value: statsData?.total_profit, label: "Total Profit" },
          { value: statsData?.referral_bonus, label: "Referral Bonus" },
          { value: statsData?.total_tickets, label: "Total Tickets" },
          { value: statsData?.total_refers, label: "Total Refers" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-full p-3 md:p-3 rounded-md bg-[#002f46] shadow-lg text-white"
          >
            <div className="p-1 md:p-2 rounded-full bg-white text-blue-500 text-2xl lg:text-4xl shrink-0">
              <PiFilePlus />
            </div>
            <div className="space-y-1">
              <div className="text-lg xl:text-2xl font-bold break-words">
                {item.value}
              </div>
              <div className="text-sm xl:text-xl whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
        {/* Header */}
        <div className="border-b border-cyan-600 pb-2 mb-3">
          <p className="font-semibold">Recent Transactions</p>
        </div>
        <div className="overflow-x-auto">
          <CustomTable
            data={deposits}
            columns={columns}
            actions={false}
          ></CustomTable>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
