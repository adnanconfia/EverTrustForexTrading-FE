import React from "react";
import * as Yup from "yup";
import { useLoading } from "../../context/LoaderContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePassword, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const passwordSchema = Yup.object().shape({
  old_password: Yup.string().required("Current password is required"),
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("new_password")], "Confirm passwords must match")
    .required("Confirm your password"),
});
const ChangePassword = () => {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const payload = {
        old_password: data.old_password,
        new_password: data.new_password,
      };
      const response = await changePassword(payload);
      toast.success("Password changed successfully");
      logout();
    } catch (error) {
      // Use error object, not resp
      toast.error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:justify-between border rounded-lg bg-[#002f46] border-cyan-600 p-4 text-white mt-5">
      {/* Header */}
      <div className="border-b border-cyan-600 pb-2 mb-3">
        <p className="font-semibold">Password Change</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="custom-label">Current Password</label>
              <input
                {...register("old_password")}
                type="password"
                placeholder="Current Password"
                className="custom-input"
              />
              <p className="custom-error">{errors.old_password?.message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="custom-label">New Password</label>
                <input
                  {...register("new_password")}
                  type="password"
                  placeholder="New Password"
                  className="custom-input"
                />
                <p className="custom-error">{errors.new_password?.message}</p>
              </div>
              <div>
                <label className="custom-label">Confirm Password</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className="custom-input"
                />
                <p className="custom-error">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>
          </div>

          <p className="custom-error">{errors.agree?.message}</p>

          {/* <GradientButton type="submit">Change Password</GradientButton> */}
          <button
            type="submit"
            className=" bg-rose-400 text-white hover:bg-rose-500  rounded-md px-3 py-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
