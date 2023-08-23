import { Outlet, Navigate } from "react-router-dom";
import React from "react";
function AuthenticatedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
export default AuthenticatedRoute;
