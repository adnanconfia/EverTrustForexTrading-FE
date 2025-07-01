import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const UnProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (token && userData) {
      const userRole = userData?.role || userData; // adjust if role is nested
      const path = userRole === "admin" ? "/admin/users" : "/user/dashboard";
      setRedirectPath(path);
    }
  }, []);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};

export default UnProtectedRoutes;
