import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleEdit = (row) => {
    alert(`Edit user: ${row.email}`);
  };
  const columns = [
    { key: "email", label: "Email", type: "string" },
    { key: "first_name", label: "First Name", type: "string" },
    { key: "last_name", label: "Last Name", type: "string" },
    { key: "refer_code", label: "Refer Code", type: "string" },
    // { key: "actions", label: "Actions", type: "actions" },
  ];
  const actions = [
    {
      label: "Delete",
      onClick: (row) => {
        confirmDialog({
          message: "Are you sure you want to delete this user?",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => handleDelete(row),
        });
      },
      className: "text-red-600 hover:underline cursor-pointer",
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/user-profile/");
      setUsers(response.data);
      setError("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
        <ConfirmDialog />
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">Recent Users</p>
      </div>
      <div className="overflow-x-auto">
        <CustomTable
          data={users}
          columns={columns}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default AdminUsers;

