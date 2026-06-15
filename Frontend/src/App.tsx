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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "./redux/store";
import { login } from "./redux/features/userSlice";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
    ],
  },

  {
    path: "/Admin",
    element: <DashboardLayout />,
    children: [
      { path: "Dashboard", element: <Dashboard /> },
      { path: "students", element: <Students /> },
       { path: "courses", element: <Courses /> },
       { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
 
   const dispatch = useDispatch();

useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(login(res.data.user));
      })
      .catch((err) => {
        console.log("failed to fetch user", err);
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