import { Navigate, useLocation } from "react-router-dom";

const UnProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (token && userData) {
    // Redirect based on user role
    const userRole = userData; // Adjust if user object has a nested 'role' field
    const redirectPath =
      userRole === "admin" ? "/admin/users" : "/user/dashboard";

    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children;
};
export default UnProtectedRoutes;
