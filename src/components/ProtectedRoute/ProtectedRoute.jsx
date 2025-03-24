import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn = localStorage.getItem("jwt"),
  children,
  anonymous = false,
}) {
  // const isLoggedIn = localStorage.getItem("jwt");

  if (anonymous && isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
