import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RootLayout from "./components/layout/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";
import DashboardLayout from "./components/layout/DashboardLayout";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import type { RootState } from "./redux/store";
import { login, setLoading} from "./redux/features/userSlice";
import Users from "./pages/Users";
import AdminRoute from "./components/layout/AdminRoute";
import StaffRoute from "./components/layout/StaffRoute";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";



const router = createBrowserRouter([
  
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
    ],
  },

    {
    path: "/forbidden",
    element: <Forbidden />,
  },

  // ADMIN
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "students", element: <Students /> },
          { path: "courses", element: <Courses /> },
          { path: "settings", element: <Settings /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },

   

  // STAFF
  {
    path: "/staff",
    element: <StaffRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "students", element: <Students /> },
          { path: "courses", element: <Courses /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },


  {
    path: "*",
    element: <NotFound />,
  },
]);
export default function App() {
   
   const dispatch = useDispatch();

useEffect(() => {
   const token = localStorage.getItem("token");

  axios
    .get(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(login(res.data.user));
    })
    .catch((err) => {
     console.log("failed to fetch user", err)
    }).finally(() => {
      dispatch(setLoading(false));
    });
}, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}