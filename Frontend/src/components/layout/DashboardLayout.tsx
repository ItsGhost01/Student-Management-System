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
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <img src="/Logo.svg" className="w-8 h-8" />
            <span className="font-semibold text-lg text-white">StudentHub</span>
          </div>

          {/* Close button */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            to="/Admin/Dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/Admin/Dashboard"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/students"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/admin/students"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={18} />
            <span>Students</span>
          </Link>

          <Link
            to="/admin/courses"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/admin/courses"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <GraduationCap size={18} />
            <span>Courses</span>
          </Link>

          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/admin/settings"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-800"
            onClick={() => {
              setOpen(true);
            }}
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

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
