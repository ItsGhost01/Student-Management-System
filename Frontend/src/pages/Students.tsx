import { Plus } from "lucide-react";

export default function Students() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>

          <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
            100 Total
          </span>
        </div>

        <p className="mt-2 text-gray-500">
          Manage Students
        </p>
      </div>

      {/* Right */}
      <button className="px-3 py-3 text-white bg-primary rounded-lg shadow hover:bg-buttonSec flex gap-1">
        <Plus className="h-5"/> Add Student
      </button>
    </div>
  );
}