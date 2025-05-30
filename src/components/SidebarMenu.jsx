import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/authContext";

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
          { label: "Dashboard", path: "/user/dashboard", icon: "pi pi-home" },
          { label: "Profile", path: "/user/profile", icon: "pi pi-user" },
          {
            label: "My Withdraws",
            path: "/user/withdraws",
            icon: "pi pi-download",
          },
          {
            label: "My Deposits",
            path: "/user/deposits",
            icon: "pi pi-upload",
          },
          { label: "My Team", path: "/user/team", icon: "pi pi-users" },
        ];

  // Sidebar content
  const menuContent = (
    <>
      <div className="text-white text-center border-b border-white h-16 flex items-center justify-center relative">
        <p className="text-3xl font-semibold">Logo</p>
        {!isLargeScreen && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white hover:text-gray-300"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>
      <ul className="space-y-2 px-4 pt-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center  px-3 py-2 rounded-lg overflow-hidden group transition-all duration-500 ease-in-out ${
                  isActive
                    ? "bg-rose-400 font-semibold text-white"
                    : "text-white"
                }`
              }
              onClick={() => !isLargeScreen && onClose()}
            >
              <span className="absolute inset-0 bg-rose-400 z-0 transition-transform transform scale-x-0  origin-left group-hover:scale-x-100 rounded-lg duration-500"></span>
              <i className={`${item.icon} z-10 group-hover:text-white`} />
              <span className="z-10 group-hover:text-white">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto px-4 py-4">
        <button
          onClick={handleLogout}
          className="relative group w-full text-left cursor-pointer px-3 py-2 rounded-lg flex justify-between items-center text-rose-500 overflow-hidden hover:text-white"
        >
          <span className="absolute inset-0 bg-rose-400 z-0 transform scale-x-0 rounded-lg origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          <span className="z-10">Logout</span>
          <FaArrowRightFromBracket className="z-10" />
        </button>
      </div>
    </>
  );

  if (isLargeScreen) {
    // Permanent sidebar for large screen
    return (
      <nav
        className={`bg-[#002f46] text-white h-full overflow-y-auto transition-width duration-300 shadow-xl w-64 flex-shrink-0 flex flex-col`}
        style={{
          width: visible ? 256 : 0,
          overflow: visible ? "auto" : "hidden",
        }}
      >
        {visible && menuContent}
      </nav>
    );
  }

  // Mobile sidebar with overlay
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!visible}
      />
      <nav
        className={`fixed top-0 left-0 bottom-0 bg-[#002f46] text-black w-64 z-40 shadow-xl transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {menuContent}
      </nav>
    </>
  );
};

export default SidebarMenu;
