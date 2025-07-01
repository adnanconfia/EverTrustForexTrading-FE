import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoutes = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // If auth status is not yet determined, don't render anything
  if (isAuthenticated === null) {
    return null; // Or return a spinner/loader
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Safely extract role
  const role = user?.role || user; // support both formats

  // Redirect if user accesses wrong panel
  if (role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (role === "admin" && location.pathname.startsWith("/user")) {
    return <Navigate to="/admin/users" replace />;
  }

  // All good, render children or nested routes
  return children || <Outlet />;
};
