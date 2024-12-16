import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-wrapper flex justify-center  lg:px-20">
      <div className="custom-bg "></div>
      <div className="content-wrapper container">
        <Header />
        <main className="px-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
