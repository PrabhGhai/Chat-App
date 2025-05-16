import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const { isSigningUp, signup } = useAuthStore();
  const [Values, setValues] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const validateForm = () => {
    if (!Values.email.trim()) return toast.error("Email is required");
    if (!Values.fullName.trim()) return toast.error("Full Name is required");
    if (!Values.password.trim()) return toast.error("Password is required");
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let handleValidation = validateForm();
    if (handleValidation === true) {
      signup(Values);
    }
    setValues({
      email: "",
      fullName: "",
      password: "",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              value={Values.fullName}
              onChange={(e) =>
                setValues({ ...Values, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              value={Values.email}
              onChange={(e) => setValues({ ...Values, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              value={Values.password}
              onChange={(e) =>
                setValues({
                  ...Values,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Loading...." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
