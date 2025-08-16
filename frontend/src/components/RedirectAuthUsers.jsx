import React from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

const RedirectAuthUsers = ({ children }) => {
  const { isAuthenticated, user,  } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectAuthUsers;
