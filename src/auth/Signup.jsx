import React, { useEffect } from "react";
import { countries } from "../helper/countryList";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../context/LoaderContext";
import { signup } from "../services/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import GradientButton from "../components/GradientButton";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
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
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoading();
  const { logout, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange",
  });
  useEffect(() => {
    const inviteCode = searchParams.get("invite");
    if (inviteCode) {
      setValue("refer_code", inviteCode); // set default value
    }
  }, [searchParams, setValue]);

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
    <div className="min-h-screen flex items-center justify-center py-3 min-w-screen">
      <div className="bg-white m-auto w-full md:w-md lg:w-[700px] py-6 px-10 rounded-2xl shadow-lg">
        <div className="mb-6 text-start">
          <h2 className="text-xl font-semibold">Create an account</h2>
          <p className="text-gray-500 text-sm">
            Register to continue with Ever Trust Forex Trading
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register("first_name")}
                placeholder="First Name"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.first_name?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register("last_name")}
                placeholder="Last Name"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.last_name?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Country
              </label>
              <select
                {...register("country")}
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
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
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Referral Code
              </label>
              <input
                {...register("refer_code")}
                placeholder="Referral Code"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-cyan-500 focus:border-cyan-500 sm:text-sm"
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

          <GradientButton type="submit">Create Account</GradientButton>

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
