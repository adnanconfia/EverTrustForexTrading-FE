import React from "react";

const Login = () => {
  return (
    <div
      className="bg-white m-auto  h-full flex items-center justify-center max-w-md p-10 rounded-2xl shadow-lg
  "
    >
      <div>
        <h2 className="font-semibold text-3xl">Welcome Back!</h2>
        <p className="text-gray-500">
          Sign in to continue with Ever Trust Forex Trading User Panel
        </p>
        <form>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-rose-400 w-5 h-5" />
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
             transition-all duration-700 ease-in-out shadow-md text-lg font-semibold"
          >
            ACCOUNT LOGIN
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
  );
};

export default Login;
