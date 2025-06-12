import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/user-profile/");
      const formatted = response.data.map((user) => ({
        id: user.id ?? null,
        email: user.email ?? null,
        first_name: user.first_name ?? null,
        last_name: user.last_name ?? null, // Include this if needed; otherwise remove
        username: user.username ?? null,
        phone_number: user.phone_number ?? null,
        photo: user.photo ?? null,
        gender: user.gender ?? null,
        date_of_birth: user.date_of_birth ?? null, // Include only if required
        address: user.address ?? null,
        city: user.city ?? null,
        zip_code: user.zip_code ?? null,
        country: user.country ?? null,
        refer_code: user.refer_code ?? null,
        level: user.level ?? null,
        level_name: user.level_name,
      }));

      setUsers(formatted);
      setError("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers(); // ✅ only fetch if authenticated
    }
  }, [isAuthenticated]); // ✅ depends on isAuthenticated

  return (
    <UserContext.Provider value={{ users, setUsers, fetchUsers, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
