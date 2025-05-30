import { FaArrowLeft, FaBars, FaBell, FaUser } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const GlobalHeader = ({ onSidebarToggle, sidebarVisible }) => {
  return (
    <header className="sticky top-0 left-0 w-full h-16 bg-[#002f46] px-3 text-white border-b border-gray-100 flex justify-between items-center shadow-xl z-50">
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

        <div className="bg-rose-400 p-2 rounded cursor-pointer hover:bg-rose-500">
          <FaUser size={14} />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
