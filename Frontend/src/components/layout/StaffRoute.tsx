import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

export default function StaffRoute() {
   const { value: user, loading } = useSelector(
  (state: RootState) => state.user
);

    if (loading) {
  return <div>Loading...</div>;
}
 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "staff") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}