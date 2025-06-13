import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";
import { useLoading } from "./LoaderContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const { setLoading } = useLoading();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user-profile/");
      const formatted = response.data.map((user) => ({
        id: user.id ?? null,
        email: user.email ?? null,
        first_name: user.first_name ?? null,
        last_name: user.last_name ?? null,
        username: user.username ?? null,
        phone_number: user.phone_number ?? null,
        photo: user.photo ?? null,
        gender: user.gender ?? null,
        date_of_birth: user.date_of_birth ?? null,
        address: user.address ?? null,
        city: user.city ?? null,
        zip_code: user.zip_code ?? null,
        country: user.country ?? null,
        refer_code: user.refer_code ?? null,
        level: user.level ?? null,
        level_name: user.level_name ?? null,
      }));
      setUsers(formatted);
      setError("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to fetch users");
    } finally {
      setLoading(false); // ✅ Stop global loader
    }
  };

  const resetUsers = () => {
    setUsers([]);
    setError("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    } else {
      resetUsers();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ users, setUsers, fetchUsers, error, resetUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
