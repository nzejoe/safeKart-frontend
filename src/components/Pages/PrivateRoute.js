import React from 'react'
import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {
   const isAuthenticated = Boolean(localStorage.getItem("safekartUser"));

    return isAuthenticated? children : <Navigate replace to="/accounts/login/"/>
}

export default PrivateRoute;
