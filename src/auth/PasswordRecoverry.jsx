import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../context/LoaderContext";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import GradientButton from "../components/GradientButton";
const recoverySchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});
const PasswordRecoverry = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverySchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await resetPassword({
        token,
        password: data.password,
        email,
      });
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-3">
      <div className="bg-white m-auto max-w-lg py-6 px-10 rounded-2xl shadow-lg">
        <div className="mb-6 text-start">
          <h2 className="text-xl font-semibold">Password Reset</h2>
          <p className="text-gray-500 text-sm xxl:text-base">
            Reset your password by entering a new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1">
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                New Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter new password"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div className="md:col-span-2 mt-4">
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Re-enter new password"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>

          <GradientButton type="submit">Reset Password</GradientButton>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecoverry;
