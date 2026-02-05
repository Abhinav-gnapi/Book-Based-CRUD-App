import React from "react";
import ButtonField from "../components/ButtonField";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface UserSidebarProps {
  menu: string[];
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({
  menu,
  activeMenu,
  onMenuChange,
}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    try {
      api.post("/logout");
       navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <aside className="h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-[1rem] text-slate-200 shadow-xl">
    {/* Brand */}
    <div className="flex h-16 items-center gap-1 px-4 text-xl font-semibold">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow">
        B
      </span>
      <span className="tracking-wide">store</span>
    </div>

      {/* Menu */}
      <nav className="p-[1.5rem]">
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => onMenuChange(item)}
            className={`w-full rounded-[8px] p-[1rem] text-left text-sm font-medium transition-all
              ${
                activeMenu === item
                  ? "bg-gray-600 text-[#fff] shadow-inner"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
          >
            {item}
          </button>
        ))}

        <ButtonField id="logout" type="submit" data="Logout" onClick={handleLogout} className="p-[1rem] /*mt-[24rem]*/"></ButtonField>
      </nav>
    </aside>
  );
};

export default UserSidebar;
