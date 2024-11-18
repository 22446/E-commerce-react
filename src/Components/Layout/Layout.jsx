import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Fotter from "../Fotter/Fotter";
import style from "../Layout/Layout.module.css";

export default function Layout() {
  return (
    <div className={style.root}>
      <Navbar />
      <div className={`${style.content}`}>
        <Outlet />
      </div>
      <Fotter />
    </div>
  );
}
