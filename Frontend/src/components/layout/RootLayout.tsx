import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
