import React from "react";
import { countries } from "../helper/countryList";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../context/LoaderContext";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  refer_code: Yup.string(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  agree: Yup.bool().oneOf([true], "You must accept terms and privacy policy"),
});

const Signup = () => {
  const { setLoading } = useLoading();
  const { logout, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const resp = await signup(data);

      localStorage.setItem("token", resp.token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      toast.success("Registration successful!");
      setUser(resp.user); // Not result.user

      navigate("/user/dashboard");
    } catch (error) {
      // Use error object, not resp
      toast.error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white m-auto max-w-lg py-6 px-10 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-gray-500">
            Register to continue with Ever Trust Forex Trading
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName?.message}
              </p>
            </div>
            <div>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName?.message}
              </p>
            </div>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <select
                {...register("country")}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <p className="text-sm text-red-500 mt-1">
                {errors.country?.message}
              </p>
            </div>
            <div>
              <input
                {...register("refer_code")}
                placeholder="Referral Code"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>
            <div className="md:col-span-2">
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register("agree")}
              className="w-5 h-5 accent-cyan-500 mt-1"
            />
            <span className="mt-1">
              I agree with{" "}
              <a href="#" className="text-pink-500 font-medium">
                Privacy & Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-pink-500 font-medium">
                Terms & Condition
              </a>
            </span>
          </div>
          <p className="text-sm text-red-500 mt-1">{errors.agree?.message}</p>
          <button
            type="submit"
            className="w-full mt-6 text-white py-3 rounded-md 
             bg-gradient-to-r from-rose-400 to-cyan-500 
             hover:from-rose-400 hover:to-rose-400
             transition-all duration-700 ease-in-out shadow-md text-lg font-semibold"
          >
            CREATE ACCOUNT
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
