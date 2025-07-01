import React from "react";
import { useNavigate } from "react-router-dom";

const AddMoney = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3 flex justify-between items-center">
        <p className="font-semibold">Add Money</p>
        <PrimaryButton onClick={() => navigate("/user/deposit-log")}>
          Deposit History
        </PrimaryButton>
      </div>
      <div></div>
    </div>
  );
};

export default AddMoney;
