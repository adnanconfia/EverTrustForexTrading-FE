import React from "react";
import { useNavigate } from "react-router-dom";

const AddMoney = () => {
  const naviagte = useNavigate();
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Add Money</p>
        <button
          className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500 transition-colors duration-300"
          onClick={() => naviagte("/user/deposit-log")}
        >
          Deposit History
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default AddMoney;
