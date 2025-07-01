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

  // ✅ Fetch all user profiles
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Replace single user after profile update
  const updateUserInContext = (updatedUser) => {
    setUsers((prevUsers) => {
      const updatedList = prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      return updatedList;
    });
  };

  // ✅ Clear context state
  const resetUsers = () => {
    setUsers([]);
    setError("");
  };

  // ✅ Auto-fetch when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    } else {
      resetUsers();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers,
        updateUserInContext,
        error,
        resetUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
