import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useUsers } from "../../context/UserContext";

const AdminUsers = () => {
  const { users } = useUsers() || {};

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
      disabled: (row) => row.admin === true || row.is_superuser === true,
    },
  ];

  useEffect(() => {
    // fetchUsers();
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
        <CustomTable data={users} columns={columns} actions={actions} />
      </div>
    </div>
  );
};

export default AdminUsers;
