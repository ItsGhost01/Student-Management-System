import { Outlet } from "react-router";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div>
<main className="flex-1 bg-linear-to-b from-primary via-white to-primary">
        <Outlet />
      </main>

      <Footer/>

    </div>
  );
}
