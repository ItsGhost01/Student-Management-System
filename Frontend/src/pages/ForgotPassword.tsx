import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/reset-password", data);

      reset();
      toast.success("Password reset successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center p-4">
      <div className="w-200 max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
        <div className="grid md:grid-cols-2 items-center gap-1">

          {/* Left Side */}
          <div className="hidden md:block w-full max-w-lg h-auto">
            <img
              src="/forget.png"
              alt="Reset Password"
              className="w-48 sm:w-64 md:w-full max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md flex flex-col items-center">

              {/* Logo */}
              <div className="flex items-center gap-2 mb-5">
                <img
                  src="/Logo.svg"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <span className="font-semibold text-lg">
                  StudentHub
                </span>
              </div>

              {/* Header */}
              <div className="mb-5 text-center">
                <h1 className="text-3xl font-bold text-primary">
                  Reset Password
                </h1>

                <p className="text-gray-500 mt-2">
                  Enter new password for your account
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2 w-full"
              >
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-error">*</span>
                  </label>

                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2.5 border rounded-xl transition focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className={`w-full px-4 py-2.5 pr-10 border rounded-xl transition focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                    />

                    {showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowPassword(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                      />
                    )}
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className={`w-full px-4 py-2.5 pr-10 border rounded-xl transition focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                    />

                    {showConfirmPassword ? (
                      <Eye
                        onClick={() => setShowConfirmPassword(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5 cursor-pointer"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowConfirmPassword(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                      />
                    )}
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-buttonSec text-white font-semibold rounded-xl shadow-md transition duration-300 cursor-pointer"
                >
                  Reset Password
                </button>
              </form>

              {/* Back to Login */}
              <p className="text-gray-600 mt-4 text-center">
                Remember your password?{" "}
                <Link to="/login">
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Login
                </button>
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}