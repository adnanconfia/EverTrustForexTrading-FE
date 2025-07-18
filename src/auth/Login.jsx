import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/authContext";
import { useLoading } from "../context/LoaderContext";
import { toast } from "react-toastify";
import GradientButton from "../components/GradientButton";
import { useUsers } from "../context/UserContext";
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
  const { fetchUsers } = useUsers(); // from UserContext

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await login(data);

      // Save full user object

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      if (result.user == "user") {
        navigate(`/${result.user}/dashboard`);
      } else {
        navigate(`/${result.user}/users`);
      }
      await fetchUsers();
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
              <label className="whitebg-label">Email address</label>
              <input
                {...register("email")}
                type="email"
                required
                className="whitebg-input"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>
            <div className="mt-4">
              <label className="whitebg-label">Password</label>
              <input
                type="password"
                {...register("password")}
                required
                className="whitebg-input"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                {/* <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-cyan-400 w-5 h-5" />
                  Remember me
                </label> */}
                <div>
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-cyan-400 bg-gray-100 border-gray-300 rounded-sm focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-black font-semibold hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <GradientButton type="submit">Account Login</GradientButton>
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
