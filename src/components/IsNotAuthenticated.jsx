import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsNotAuthenticated = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return <Navigate to="/profile" />;
  }
  return <Outlet />;
};

export default IsNotAuthenticated;
