import React, { useState } from "react";
import AdminSidebar from "./UserSidebar";
import ViewAllBooks from "./pages/ViewAllBooks";
import Wishlist from "./pages/Wishlist";
import Profile from "../components/Profile";

const menu = ["View All Books", "WishList", "Profile"];

const UserHome: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState(menu[0]);

  const renderContent = () => {
    switch (activeMenu) {
      case "View All Books":
        return <ViewAllBooks />;
      case "WishList":
        return <Wishlist />;
      case "Profile":
        return <Profile />
      default:
        return null;
    }
  };

  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <AdminSidebar
        menu={menu}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
      />

      <main className="bg-slate-50 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default UserHome;
