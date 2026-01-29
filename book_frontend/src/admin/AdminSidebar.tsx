import React from "react";

interface AdminSidebarProps {
  menu: string[];
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  menu,
  activeMenu,
  onMenuChange,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 p-4 text-slate-200 shadow-xl">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 px-4 text-xl font-semibold">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow">
          B
        </span>
        <span className="tracking-wide">store</span>
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2">
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => onMenuChange(item)}
            className={`w-full rounded-xl p-4 text-left text-sm font-medium transition-all
              ${
                activeMenu === item
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
