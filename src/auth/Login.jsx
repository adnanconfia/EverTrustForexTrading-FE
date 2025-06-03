import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/authContext";
import { useLoading } from "../context/LoaderContext";
import { toast } from "react-toastify";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { logout, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);

      // Save full user object

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      navigate(`/${result.user}/dashboard`);
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
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
        <div>
          <h2 className="font-semibold text-xl">Welcome Back!</h2>
          <p className="text-gray-500">
            Sign in to continue with Ever Trust Forex Trading User Panel
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
            <div className="mt-4">
              <label className="block text-sm font-normal text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-cyan-400 w-5 h-5" />
                  Remember me
                </label>
                <a
                  href="/forgot-password"
                  className="text-black font-semibold hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-md font-semibold"
            >
              Account Login
            </button>
          </form>
          <div className="mt-6">
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-rose-400 hover:text-rose-600 transition-colors duration-300 cursor-pointer font-semibold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
