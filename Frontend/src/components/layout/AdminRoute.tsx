import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

export default function AdminRoute() {

  const { value: user, loading } = useSelector(
  (state: RootState) => state.user
);


  if (loading) {
  return <div>Loading...</div>;
}

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // wrong role
  if (user?.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }


  return <Outlet />;
}