import React, { ReactNode } from "react";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";
import TopBar from "./components/TopBar/TopBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full">
      <LeftDrawer />
      <main className="w-[calc(100%-250px)] min-h-[100vh] ml-[250px] relative">
        <TopBar />
        <div className="mt-[66px] overflow-y-scroll">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
