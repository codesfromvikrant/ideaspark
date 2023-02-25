import React from "react";
// Components
import Sidepanel from "./Sidepanel";

// Routing
import { Routes, Route, Outlet } from "react-router-dom";


const Client = () => {
  return (
    <div className="h-[100vh] flex justify-start items-start">
      <Sidepanel />
      <Outlet />
    </div>
  )
}

export default Client;