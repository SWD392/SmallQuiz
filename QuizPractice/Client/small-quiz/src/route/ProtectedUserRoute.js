import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedUserRoute = () => {
    const admin = localStorage.getItem("role");
    const isAdmin = admin === "ROLE_USER" ? true : null
    return isAdmin ? <Outlet /> : <Navigate to="/deny" />;
  
}
