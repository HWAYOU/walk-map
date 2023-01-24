import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Root = () => {
  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
};

export default Root;
