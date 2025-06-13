import { FaArrowLeft, FaBars, FaBell, FaUser } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";

import { HiCog, HiLogout } from "react-icons/hi";
import { useUsers } from "../context/UserContext";
import { BiLock, BiSupport } from "react-icons/bi";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import useWalletStore from "../stores/walletStore";

const GlobalHeader = ({ onSidebarToggle, sidebarVisible }) => {
  const navigate = useNavigate();
  const { users } = useUsers() || {};
  const { resetWalletState } = useWalletStore();
  const { resetUsers } = useUsers();
  const currentUser = users?.[0];
  const { user } = useAuth();
  const role = user || "user";
  // console.log("Current User:", role);

  return (
    <header className="sticky top-0 left-0 w-full h-16 bg-[#002f46] px-3 text-white border-b border-gray-100 flex justify-between items-center shadow-xl z-50 py-4.5">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded"
          aria-label="Toggle sidebar"
        >
          {sidebarVisible ? <FaArrowLeft size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <FiSun className="text-lg cursor-pointer hover:text-yellow-400" />

        <div className="relative">
          <FaBell className="text-lg cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-rose-600 text-xs text-white rounded-full px-1.5">
            0
          </span>
        </div>

        <select className="bg-rose-400 text-white text-sm px-2 py-1 rounded">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        <Dropdown
          label={
            <div className="bg-rose-400 p-2 rounded cursor-pointer hover:bg-rose-500">
              <FaUser size={14} />
            </div>
          }
          inline
          arrowIcon={false}
        >
          <DropdownHeader>
            <span className="block text-sm">{currentUser?.first_name}</span>
            <span className="block truncate text-sm font-medium">
              {currentUser?.email}
            </span>
          </DropdownHeader>
          <DropdownItem
            icon={HiCog}
            className="hover:bg-rose-400 focus:bg-rose-400 hover:text-white focus:text-white"
            onClick={() => navigate("settings")}
          >
            Settings
          </DropdownItem>

          {role === "user" && (
            <DropdownItem
              icon={BiLock}
              className="hover:bg-rose-400 focus:bg-rose-400 hover:text-white focus:text-white"
              onClick={() => navigate("change-password")}
            >
              Change Password
            </DropdownItem>
          )}
          {role === "user" && (
            <DropdownItem
              icon={BiSupport}
              className="hover:bg-rose-400 focus:bg-rose-400 hover:text-white focus:text-white"
              onClick={() => navigate("support-tickets")}
            >
              Support Tickets
            </DropdownItem>
          )}
          <DropdownDivider />
          <DropdownItem
            icon={HiLogout}
            className="hover:bg-rose-400 focus:bg-rose-400 hover:text-white focus:text-white"
            onClick={() => {
              logout(), resetWalletState();
              resetUsers();
            }}
          >
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};

export default GlobalHeader;
