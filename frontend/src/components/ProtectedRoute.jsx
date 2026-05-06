import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("access_token");

  if (!isAuthenticated) {
    // اگر لاگین نبود، به صفحه لاگین برود و آدرس فعلی را ذخیره کند تا بعدا برگردد
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
