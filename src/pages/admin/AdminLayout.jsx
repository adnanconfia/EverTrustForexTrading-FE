import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu";

const AdminLayout = () => {
  return (
    <SidebarMenu>
      <Outlet />
    </SidebarMenu>
  );
};

export default AdminLayout;
