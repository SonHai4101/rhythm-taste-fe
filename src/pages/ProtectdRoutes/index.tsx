import React from "react";
import { Navbar } from "../../components/NavBar";
import { Outlet } from "react-router";

export const index = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};
