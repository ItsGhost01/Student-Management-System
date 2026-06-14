import { Menu, Search } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

type HeaderProps = {
  setSidebarOpen: (value: boolean) => void;
};
export default function Header({ setSidebarOpen }: HeaderProps) {
  const reduxUser = useSelector((state: RootState) => state.user.value);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Student..."
            className="pl-9 pr-3 py-2 bg-gray-100 rounded-full outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          {reduxUser?.firstName} {reduxUser?.lastName}
        </span>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
          {reduxUser?.firstName?.[0]}
          {reduxUser?.lastName?.[0]}
        </div>
      </div>
    </header>
  );
}
