import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  //to toggle eye for password
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
      await axios.post("http://localhost:3000/api/login", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      reset();
      toast.success("Login successfully");
    } catch (error) {
      console.error(error);
      toast.success("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center p-4">
      <div className="w-200 max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center gap-1 lg:gap-1">
          {/* Left Side - Illustration */}
          <div className="hidden md:block w-full max-w-lg h-auto">
            <img
              src="/Login.png"
              alt="Classroom Illustration"
              className="w-48 sm:w-64 md:w-full max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right Side - Login Form */}

          {/* logo*/}
          <div className="flex items-center justify-center p-6 md:p-8 lg:p-12">
            <div className="w-full max-w-md flex flex-col items-center">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <img src="/Logo.svg" className="w-8 h-8" />
                <span className="font-semibold text-lg">StudentHub</span>
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl  font-bold font-poppins text-primary">
                  Welcome Back
                </h1>
                <p className="text-gray-500 mt-2">
                  Sign in to continue learning
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 ">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-error focus:ring-error focus:border-error"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      Email is required
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 pr-10 ${
                        errors.password
                          ? "border-error focus:ring-error focus:border-error"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
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
                    <span className="text-error text-sm mt-1">
                      Password is required
                    </span>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-buttonSec hover:underline cursor-pointer "
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-buttonSec text-white font-semibold rounded-xl shadow-md transition duration-300 cursor-pointer"
                >
                  Sign In
                </button>
              </form>
              <DevTool control={control} />

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Sign Up */}
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:text-primary cursor-pointer hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
