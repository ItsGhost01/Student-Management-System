import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function Settings() {
  const reduxUser = useSelector((state: RootState) => state.user.value);
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Update your profile information</p>
      </div>

      {/* Center Form */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow rounded-2xl p-6">
          <p className="font-bold text-2xl">Personal Information</p>
          <p className="font-medium mb-1">Update your profile information</p>

          <form className="space-y-6">
            {/* Profile Image */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-primary">
                {reduxUser?.image ? (
                  <img
                    src={`http://localhost:3000/${reduxUser.image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-white">
                    {reduxUser?.firstName?.[0] ?? "U"}
                    {reduxUser?.lastName?.[0] ?? ""}
                  </span>
                )}
              </div>

              <div>
                <label className="cursor-pointer text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Upload Image
                  <input type="file" className="hidden" />
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG allowed. Max 2MB.
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                defaultValue={reduxUser?.firstName}
                type="text"
                placeholder="First Name"
                className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                defaultValue={reduxUser?.lastName}
                type="text"
                placeholder="Last Name"
                className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              defaultValue={reduxUser?.email}
              type="email"
              placeholder="Work Email"
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-buttonSec transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
