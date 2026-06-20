import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Dashboard() {
  const reduxUser = useSelector((state: RootState) => state.user.value);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome to the Student Management System
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="relative bg-primary rounded-3xl p-6 shadow-xl overflow-hidden ">
        {/* Decorative Shapes */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-full"></div>

        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-white text-4xl font-bold leading-tight">
              Welcome to StudentHub
            </h2>

            <p className="hidden md:block text-white text-2xl font-medium mt-4">
              Mr. {reduxUser?.firstName} {reduxUser?.lastName}
            </p>

            <p className="text-white/80 text-lg mt-3 max-w-xl">
              Manage students, courses, and system settings from one place.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center flex-1">
            <DotLottieReact
              src="/dashboard.lottie"
              loop
              autoplay
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Students</p>
          <h3 className="text-3xl font-bold mt-2">120</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <h3 className="text-3xl font-bold mt-2">15</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Active Users</p>
          <h3 className="text-3xl font-bold mt-2">8</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Departments</p>
          <h3 className="text-3xl font-bold mt-2">5</h3>
        </div>
      </div>
    </div>
  );
}
