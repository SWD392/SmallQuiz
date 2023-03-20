import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedAdminRoute = () => {
    const admin = localStorage.getItem("role");
    const isAdmin = admin === "ROLE_ADMIN" ? true : null
    return isAdmin ? <Outlet /> : <Navigate to="/deny" />;
  
}
