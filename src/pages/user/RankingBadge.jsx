import React from "react";
import { FaLock } from "react-icons/fa";

const RankingBadge = () => {
  const currentStage = 2; // static user stage

  const badges = [
    {
      id: 1,
      name: "Starter Badge",
      description: "Awarded for completing the first task.",
    },
    {
      id: 2,
      name: "Rising",
      description:
        "User Must have 50$+ investment. Minimum Earning: 50$ Direct Referrals (L1): 3 Total Referrals (L1+L2+L3): 8 Bonus: 10$",
    },
    {
      id: 3,
      name: "Advancer",
      description:
        "User Must have 100$+ investment. Minimum Earning: 200$ Direct Referrals (L1): 8 Total Referrals (L1+L2+L3): 26 Bonus: 20$",
    },
    {
      id: 4,
      name: "Leader",
      description:
        "User Must have 250$+ investment. Minimum Earning: 500$ Direct Referrals (L1): 15 Total Referrals (L1+L2+L3): 50 Bonus: 50$",
    },
    {
      id: 5,
      name: "Elite",
      description:
        "User Must have 500$+ investment. Minimum Earning: 1500$ Direct Referrals (L1): 25 Total Referrals (L1+L2+L3): 95 Bonus: 100$",
    },
    {
      id: 5,
      name: "Master",
      description:
        "User Must have 1000$+ investment. Minimum Earning: 3000$ Direct Referrals (L1): 35 Total Referrals (L1+L2+L3): 215 Bonus: 150$",
    },
  ];

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">All The Badges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => {
          const stage = index + 1;
          const isCurrent = stage === currentStage;
          const isLocked = stage > currentStage;

          return (
            <div
              key={badge.name}
              className={`relative group p-3 rounded-md bg-[#2d495a] shadow-lg border-2 border-cyan-600 transition-all duration-300`}
            >
              {/* Lock icon */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 transition-opacity duration-300 group-hover:opacity-0 z-20">
                  <FaLock size={60} />
                </div>
              )}

              {/* Badge content */}
              <div
                className={`flex justify-center items-center flex-col h-full transition-opacity duration-300 ${
                  isLocked
                    ? "opacity-50 group-hover:opacity-100"
                    : "opacity-100"
                }`}
              >
                <h3 className="text-lg font-semibold text-center z-10">
                  {badge.name}
                </h3>
                <p className="text-center z-10">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingBadge;
