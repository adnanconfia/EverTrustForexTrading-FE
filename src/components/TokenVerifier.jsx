// TokenVerifier.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../context/authContext";

export default function TokenVerifier() {
  const { logout, setUser } = useAuth(); // ✅ access setUser
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axiosInstance.get("/verify-token/");
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Token verification failed"
        );
        logout();
        navigate("/login");
      }
    };

    verifyToken();
  }, [logout, navigate, setUser]);

  return null;
}
