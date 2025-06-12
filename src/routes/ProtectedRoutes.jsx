// routes/ProtectedRoutes.jsx
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoutes = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = user; // assuming user object contains 'role' field

  if (role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (role === "admin" && location.pathname.startsWith("/user")) {
    return <Navigate to="/admin/users" replace />;
  }

  return children || <Outlet />;
};
