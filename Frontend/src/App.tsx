import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/layout/RootLayout";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // { index: true, Component: Dashboard },
      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },
      { path: "/forgotpassword", Component: ForgotPassword },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}