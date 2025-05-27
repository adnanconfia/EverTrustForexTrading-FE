import React from "react";
import { countries } from "../helper/countryList";

const Signup = () => {
  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 border border-gray-200">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-gray-500">
          Register to continue with Ever Trust Forex Trading
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your First Name"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Last Name"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Country<span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm">
              {countries.map((country, index) => {
                return <option key={index}>{country}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Referral Code
            </label>
            <input
              type="text"
              placeholder="Enter referral code"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-600">
          <input type="checkbox" className="w-4 h-4 accent-rose-500 mr-2" />
          <span>
            I agree with{" "}
            <a href="#" className="text-rose-500 font-medium">
              Privacy & Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-rose-500 font-medium">
              Terms & Condition
            </a>
          </span>
        </div>

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
  );
};

export default Signup;
