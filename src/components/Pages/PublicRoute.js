import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({children}) => {
   const isAuthenticated = Boolean(localStorage.getItem("safekartUser"));
  return !isAuthenticated ? children : <Navigate replace to="/"/>;
};

export default PublicRoute;
