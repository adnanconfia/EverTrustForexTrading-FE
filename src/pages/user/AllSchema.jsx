import React from "react";
import { CiTrophy } from "react-icons/ci";
import { LuTrophy } from "react-icons/lu";

const AllSchema = () => {
  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All The Schemas</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 w-full mt-5">
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-md flex flex-col bg-[#2d495a] shadow-lg border-2 border-rose-400">
          <div className="w-full flex justify-end">
            <div className="bg-gradient-to-r from-rose-400 to-cyan-500  text-white px-2 py-0.5 rounded">
              <p className="text-sm font-bold">Daily Profit Range: 5.5% - 6%</p>
            </div>
          </div>
          <div>
            <LuTrophy className="text-5xl font-bold text-cyan-500" />
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-2xl font-semibold text-white">Silver Edge</h2>
            <p className="text-sm text-yellow-500 font-bold">Daily 5.5%</p>
          </div>
          <div className="">
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Investment</p>
              <p className="text-sm font-semibold text-white bg-emerald-700 px-1 rounded-md">
                $25
              </p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Capital Back</p>
              <p className="text-sm text-white font-semibold ">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Return Type</p>
              <p className="text-sm text-white font-semibold">Period</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Number of Period
              </p>
              <p className="text-sm text-white font-semibold">30 Times</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">
                Profit Withdraw
              </p>
              <p className="text-sm text-white font-semibold">Any Time</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-sm text-white font-semibold">Cancel</p>
              <p className="text-sm text-white font-semibold">No</p>
            </div>
            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-xs text-yellow-500 font-semibold">
                * Saturday, Sunday are Holidays
              </p>
            </div>
            <div className="py-3">
              <button
                type="button"
                className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
              >
                Invest Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSchema;
