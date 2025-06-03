// routes/AppRoutes.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import { useLoading } from "../context/LoaderContext";
import { ProtectedRoutes } from "./ProtectedRoutes";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

import UserLayout from "../pages/user/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UnProtectedRoutes from "./UnProtectedRoutes";
import ForgetPassword from "../auth/ForgetPassword";
import NotFound from "../components/NotFound";
import PasswordRecoverry from "../auth/PasswordRecoverry";
import AllSchema from "../pages/user/AllSchema";

const AppRoutes = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <RiseLoader color="#f43f5e" />
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            <UnProtectedRoutes>
              <Login />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/register/:referCode?"
          element={
            <UnProtectedRoutes>
              <Signup />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgetPassword></ForgetPassword>}
        />
        <Route path="/reset-password/:token" element={<PasswordRecoverry />} />

        <Route
          path="/user"
          element={
            <ProtectedRoutes>
              <UserLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="schemas" element={<AllSchema />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
