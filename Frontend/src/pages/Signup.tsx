import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/register", data);

      reset();
      toast.success("Account created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center p-4 ">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden ">
        <div className="grid md:grid-cols-2 items-center">

          {/* Left Side */}
          <div className="hidden md:flex justify-center items-center p-6">
            <img
              src="/signup.png"
              alt="Signup Illustration"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 md:p-8 lg:p-12">
            <div className="w-full max-w-md">

              {/* Logo */}
              <div className="flex items-center justify-center gap-2 mb-6">
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
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-poppins text-primary">
                  Create Account
                </h1>

                <p className="text-gray-500 mt-2">
                  Create your account to get started
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* First Name + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-error">*</span>
                    </label>

                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      type="text"
                      placeholder="First Name"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.firstName
                          ? "border-error focus:ring-error"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                    />

                    {errors.firstName && (
                      <p className="text-error text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-error">*</span>
                    </label>

                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      type="text"
                      placeholder="Last Name"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.lastName
                          ? "border-error focus:ring-error"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                    />

                    {errors.lastName && (
                      <p className="text-error text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-error focus:ring-error"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                  />

                  {errors.email && (
                    <p className="text-error text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border rounded-xl pr-10 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-error focus:ring-error"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                    />

                    {showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-primary"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowPassword(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500"
                      />
                    )}
                  </div>

                  {errors.password && (
                    <p className="text-error text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-error">*</span>
                  </label>

                  <select
                    {...register("role", {
                      required: "Role is required",
                    })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.role
                        ? "border-error focus:ring-error"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>

                  {errors.role && (
                    <p className="text-error text-sm mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-buttonSec text-white font-semibold rounded-xl shadow-md transition duration-300 cursor-pointer"
                >
                  Create Account
                </button>
              </form>

              <DevTool control={control} />

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-400">
                  OR
                </span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                 <Link to="/login">
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}