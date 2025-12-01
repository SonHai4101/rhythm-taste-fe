import React from "react";
import { Navbar } from "../../components/NavBar";
import { Outlet } from "react-router";
import { PlaybackBar } from "@/components/PlaybackBar";

export const index = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
      <PlaybackBar />
    </div>
  );
};
