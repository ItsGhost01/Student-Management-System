import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import ConfirmDialog from "../../pages/ConfirmDialog";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // FIX: works for both /admin/dashboard and /staff/dashboard
  const isActive = (path: string) =>
    location.pathname.split("/").pop() === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-slate-900 text-white flex flex-col
          transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Top */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <img src="/Logo.svg" className="w-8 h-8" />
            <span className="font-semibold text-lg text-white">StudentHub</span>
          </div>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            to="dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("dashboard")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="students"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("students")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={18} />
            <span>Students</span>
          </Link>

          <Link
            to="courses"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("courses")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <GraduationCap size={18} />
            <span>Courses</span>
          </Link>

          <Link
            to="settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("settings")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          <Link
            to="users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("users")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800"
            onClick={() => setOpen(true)}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

          <ConfirmDialog
            open={open}
            title="Logout"
            description="Do you really want to logout?"
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              dispatch(logout());
              setOpen(false);
              navigate("/login");
            }}
          />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}