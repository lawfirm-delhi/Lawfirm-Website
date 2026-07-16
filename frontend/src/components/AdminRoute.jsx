import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const adminPassword = localStorage.getItem('admin_password');

  if (adminPassword !== 'Welcome@123#') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
