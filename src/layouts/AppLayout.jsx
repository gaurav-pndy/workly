import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-wrapper flex justify-center  lg:px-20">
      <div className="custom-bg">
        <div className="content-wrapper container  mx-auto">
          <Header />
          <main className="px-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
