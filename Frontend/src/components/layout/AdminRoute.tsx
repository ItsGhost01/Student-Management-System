import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

export default function AdminRoute() {
  const user = useSelector((state: RootState) => state.user.value);

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // wrong role
  if (user.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}