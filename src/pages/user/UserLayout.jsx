import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../../components/SidebarMenu";
import GlobalHeader from "../../components/GlobalHeader";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const onResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarMenu
        visible={sidebarOpen}
        isLargeScreen={isLargeScreen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <GlobalHeader
          onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
          sidebarVisible={sidebarOpen}
        />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
