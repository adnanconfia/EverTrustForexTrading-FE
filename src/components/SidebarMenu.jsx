import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket, FaWallet } from "react-icons/fa6";
import { FaTimes, FaUniversity } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { FiFilePlus } from "react-icons/fi";

const SidebarMenu = ({ visible, isLargeScreen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user || "user";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems =
    role === "admin"
      ? [
          { label: "Users", path: "/admin/users", icon: "pi pi-users" },
          {
            label: "Withdraws",
            path: "/admin/withdraw",
            icon: "pi pi-download",
          },
          { label: "Deposits", path: "/admin/deposit", icon: "pi pi-upload" },
          { label: "Settings", path: "/admin/settings", icon: "pi pi-cog" },
          {
            label: "Notifications",
            path: "/admin/notifications",
            icon: "pi pi-bell",
          },
          {
            label: "Terms & Conditions",
            path: "/admin/terms",
            icon: "pi pi-file",
          },
        ]
      : [
          {
            label: "Dashboard",
            icon: "pi pi-th-large",
            path: "/user/dashboard",
          },
          {
            label: "All Schema",
            icon: "pi pi-check-square",
            path: "/user/schemas",
          },
          {
            label: "Schema Logs",
            icon: "pi pi-copy",
            path: "/user/schema-logs",
          },
          {
            label: "All Transactions",
            icon: "pi pi-credit-card",
            path: "/user/transactions",
          },
          {
            label: "Deposits",
            icon: "pi pi-money-bill",
            path: "/user/deposits",
          },
          {
            label: "Wallet Exchange",
            icon: "pi pi-sync",
            path: "/user/wallet-exchange",
          },
          { label: "Send Money", icon: "pi pi-send", path: "/user/send-money" },
          {
            label: "Send Money Log",
            icon: "pi pi-file-export",
            path: "/user/send-money-log",
          },
          {
            label: "Withdraw",
            icon: "pi pi-building-columns",
            path: "/user/withdraws",
          },
          {
            label: "Ranking Badge",
            icon: "pi pi-star",
            path: "/user/ranking-badge",
          },
          { label: "Referral", icon: "pi pi-users", path: "/user/referral" },
          { label: "Settings", icon: "pi pi-cog", path: "/user/settings" },
          {
            label: "Support Tickets",
            icon: "pi pi-wrench",
            path: "/user/support-tickets",
          },
          {
            label: "Notifications",
            icon: "pi pi-bell",
            path: "/user/notifications",
          },
        ];

  const menuContent = (
    <>
      <div className="text-white text-center border-b border-white h-16 flex items-center justify-center relative py-4.5">
        <p className="text-3xl font-semibold">Logo</p>
        {!isLargeScreen && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

      {/* Account Balance Section */}
      <div className="bg-rose-400 text-white p-4 rounded-md shadow-md sticky top-0 z-20 mt-4 mx-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">Account Balance</h3>
          <span className="bg-white text-orange-600 text-xs font-semibold px-2 py-1 rounded">
            WALLET
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaWallet className="text-white text-lg" />
              <span>Main Wallet</span>
            </div>
            <span className="font-bold">$0.00</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaUniversity className="text-white text-lg" />
              <span>Profit Wallet</span>
            </div>
            <span className="font-bold">$0.00</span>
          </div>
        </div>
      </div>

      <div className=" flex justify-between items-center mt-1.5 gap-2 mx-4">
        <button className="bg-blue-500 w-full px-4 py-3 rounded-sm border-0 hover:bg-rose-400 flex items-center justify-center"><FiFilePlus /><span className="ms-2">Add</span> </button>
        <button className="bg-green-400 w-full px-4 py-3 rounded-sm border-0 hover:bg-rose-400 flex items-center justify-center"><FaArrowRightFromBracket /><span className="ms-2">Invest now </span></button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto no-scrollbar mt-4 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 text-white ${
                    isActive ? "bg-rose-400" : "hover:bg-rose-400"
                  }`
                }
                onClick={() => !isLargeScreen && onClose()}
              >
                <i className={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-rose-500 hover:bg-rose-400 hover:text-white transition-colors duration-300"
        >
          <span>Logout</span>
          <FaArrowRightFromBracket />
        </button>
      </div>
    </>
  );

  // Large screen sidebar
  if (isLargeScreen) {
    return (
      <nav
        className="bg-[#002f46] text-white h-full shadow-xl flex-shrink-0 flex flex-col"
        style={{
          width: visible ? 350 : 0,
          overflow: visible ? "hidden" : "hidden",
        }}
      >
        {visible && menuContent}
      </nav>
    );
  }

  // Mobile sidebar
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-opacity-50 z-30 transition-opacity ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!visible}
      />
      <nav
        className={`fixed top-0 left-0 bottom-0 bg-[#002f46] w-70 z-40 shadow-xl transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "-translate-x-full"
        } flex flex-col no-scrollbar overflow-y-auto`}
      >
        {menuContent}
      </nav>
    </>
  );
};

export default SidebarMenu;
