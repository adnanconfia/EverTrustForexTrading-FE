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
import SchemaLogs from "../pages/user/SchemaLogs";
import AllTransaction from "../pages/user/AllTransaction";
import AddMoney from "../pages/user/AddMoney";
import MoneyLog from "../pages/user/MoneyLog";
import Deposits from "../pages/user/Deposits";
import Withdraws from "../pages/user/Withdraw";
import RankingBadge from "../pages/user/RankingBadge";
import Referral from "../pages/user/Referral";
import ProfileSetting from "../pages/user/ProfileSetting";
import SupportTicket from "../pages/user/SupportTicket";
import Notification from "../pages/user/Notification";
import ChangePassword from "../pages/user/ChangePassword";
import { WalletExchange } from "../pages/user/WalletExchange";
import AdminUser from "../pages/admin/AdminUser";
import WithdrawAccount from "../pages/user/WithdrawAccount";

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
          path="/register"
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
          <Route path="schema-logs" element={<SchemaLogs />} />
          <Route path="transactions" element={<AllTransaction />} />
          <Route path="deposits" element={<Deposits />} />
          <Route path="withdraws" element={<Withdraws />} />
          <Route path="withdraw-account" element={<WithdrawAccount />} />
          <Route path="ranking-badge" element={<RankingBadge />} />
          <Route path="referral" element={<Referral />} />
          <Route path="settings" element={<ProfileSetting />} />
          <Route path="support-tickets" element={<SupportTicket />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="wallet-exchange" element={<WalletExchange />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="users" element={<AdminUser />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
