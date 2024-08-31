import React from "react";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="right-content">
        <Outlet />
      </div>
    </>
  );
};
