import React from "react";
import { forgetPassword } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLoading } from "../context/LoaderContext";

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const ForgetPassword = () => {
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await forgetPassword(data);
      toast.success("Password reset link send to your email");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white m-auto  flex items-center justify-center max-w-md p-10 rounded-2xl shadow-lg
  "
      >
        <div className="text-start">
          <h2 className="font-semibold text-xl">Reset Password</h2>
          <p className="text-gray-500">
            Reset your password by following the instructions in the email sent
            to your email address
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6">
              <label className="block text-sm font-normal text-gray-700">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
            >
              Reset Password
            </button>
            <p className="text-center text-sm mt-4">
              Back to login page?{" "}
              <a href="/login" className="text-pink-600 font-semibold">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
