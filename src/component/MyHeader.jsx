import React from "react";
import { NavLink } from "react-router-dom";
import "../style/component/MyHeader.scss";

const MyHeader = () => {
  const activeStyle = {
    color: "#6392ff",
  };

  return (
    <div className="MyHeader">
      <NavLink
        className="link"
        style={({ isActive }) => (isActive ? activeStyle : {})}
        to="/"
      >
        메인
      </NavLink>

      <NavLink
        className="link"
        style={({ isActive }) => (isActive ? activeStyle : {})}
        to="/new"
      >
        건강기록
      </NavLink>

      <NavLink
        className="link"
        style={({ isActive }) => (isActive ? activeStyle : {})}
        to="/list"
      >
        기록관리
      </NavLink>
    </div>
  );
};

export default MyHeader;
