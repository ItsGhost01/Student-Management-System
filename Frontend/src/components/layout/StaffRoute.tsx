import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

export default function StaffRoute() {
  const user = useSelector((state: RootState) => state.user.value);

 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "staff") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}