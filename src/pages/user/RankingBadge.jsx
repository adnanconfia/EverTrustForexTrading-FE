import React from "react";
import { FaLock } from "react-icons/fa";
import {
  FaSeedling,
  FaFireAlt,
  FaStar,
  FaCrown,
  FaMedal,
  FaTrophy,
} from "react-icons/fa";
import { useUsers } from "../../context/UserContext";

const RankingBadge = () => {
  const { users } = useUsers() || {};
  const currentStage = users?.[0].level;
  // const currentStage = 2; // static user stage
  const levelIcons = {
    1: <FaSeedling size={28} className="text-green-400" />,
    2: <FaFireAlt size={28} className="text-orange-400" />,
    3: <FaMedal size={28} className="text-yellow-400" />,
    4: <FaStar size={28} className="text-green-400" />,
    5: <FaTrophy size={28} className="text-orange-400" />,
    6: <FaCrown size={28} className="text-amber-400" />,
  };

  const badges = [
    {
      id: 1,
      name: "Starter Badge",
      description: [
        {
          label: "Award",
          value:
            "Welcome to the Journey! The Starter Rank is the entry level for all new users on the platform.",
        },
      ],
    },
    {
      id: 2,
      name: "Rising",
      description: [
        { label: "Investment", value: "50$+" },
        { label: "Minimum Earning", value: "50$" },
        { label: "Direct Referrals (L1)", value: "3" },
        { label: "Total Referrals (L1+L2+L3)", value: "8" },
        { label: "Bonus", value: "10$" },
      ],
    },
    {
      id: 3,
      name: "Advancer",
      description: [
        { label: "Investment", value: "100$+" },
        { label: "Minimum Earning", value: "200$" },
        { label: "Direct Referrals (L1)", value: "8" },
        { label: "Total Referrals (L1+L2+L3)", value: "26" },
        { label: "Bonus", value: "20$" },
      ],
    },
    {
      id: 4,
      name: "Leader",
      description: [
        { label: "Investment", value: "250$+" },
        { label: "Minimum Earning", value: "500$" },
        { label: "Direct Referrals (L1)", value: "15" },
        { label: "Total Referrals (L1+L2+L3)", value: "50" },
        { label: "Bonus", value: "50$" },
      ],
    },
    {
      id: 5,
      name: "Elite",
      description: [
        { label: "Investment", value: "500$+" },
        { label: "Minimum Earning", value: "1500$" },
        { label: "Direct Referrals (L1)", value: "25" },
        { label: "Total Referrals (L1+L2+L3)", value: "95" },
        { label: "Bonus", value: "100$" },
      ],
    },
    {
      id: 6,
      name: "Master",
      description: [
        { label: "Investment", value: "1000$+" },
        { label: "Minimum Earning", value: "3000$" },
        { label: "Direct Referrals (L1)", value: "35" },
        { label: "Total Referrals (L1+L2+L3)", value: "215" },
        { label: "Bonus", value: "150$" },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All The Badges</p>
      </div>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex justify-center  flex-col items-center">
        {badges.map((badge, index) => {
          const stage = index + 1;
          const isCurrent = stage === currentStage;
          const isLocked = stage > currentStage;

          return (
            <div
              key={badge.name}
              className="relative group p-4 rounded-full bg-[#2d495a] shadow-lg border-2 border-cyan-600 transition-all duration-300 h-[260px] w-[260px] flex flex-col justify-center items-center"
            >
              {/* 🔒 Lock Icon (hidden on hover) */}
              {isLocked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <FaLock size={50} className="text-white opacity-80" />
                </div>
              )}

              {/* 🏅 Stage Icon */}
              <div className="mb-2 z-10 flex justify-center items-center">
                {levelIcons[stage]}
              </div>

              {/* 🏷️ Badge Content with reduced opacity when locked */}
              <div
                className={`flex flex-col justify-center items-center text-center z-10 text-white space-y-1 transition-opacity duration-300 ${
                  isLocked
                    ? "opacity-40 group-hover:opacity-100"
                    : "opacity-100"
                }`}
              >
                <h3 className="text-lg font-semibold">{badge.name}</h3>

                <div className="text-sm mt-1 space-y-1">
                  {badge.description.map((item, idx) => (
                    <div key={idx} className="flex justify-center gap-2">
                      {badge.id === 1 ? (
                        <span>{item.value}</span>
                      ) : (
                        <>
                          <span className="font-medium">{item.label}:</span>
                          <span>{item.value}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingBadge;
