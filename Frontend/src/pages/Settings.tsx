import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "../redux/features/userSlice";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Settings() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);

  const reduxUser = useSelector((state: RootState) => state.user.value);

  // personal info
  const form = useForm<FormValues>();
  const dispatch = useDispatch();

  const {
    register,
    // control,
    handleSubmit,
    // setError,
    // reset,
    formState: { errors },
  } = form;

  //change password
  const passwordForm = useForm<PasswordFormValues>();

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
  } = passwordForm;

  //for profile update
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(login(response.data.user));

      toast.success("Profile Updated Successfully");
      setOpenUpdateModal(false)
      console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  // for change password
  const onSubmitPassword: SubmitHandler<PasswordFormValues> = async (data) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Password updated successfully");
       setOpenChangeModal(false);
      passwordForm.reset();
    } catch (error: any) {
      const Errors = error?.response?.data?.errors;
      

      if (Errors) {
        Object.entries(Errors).forEach(([field, messages]: any) => {
          passwordForm.setError(field, {
            type: "server",
            message: messages[0],
          });
        });

        return;
        
      }

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpenUpdateModal(true);
            }}
            className="space-y-6"
          >
            {/* Profile Image */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-primary">
                {reduxUser?.image ? (
                  <img
                    // src={`${import.meta.env.VITE_API_URL}/${reduxUser.image}`}
                    src={reduxUser?.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-white">
                    {reduxUser?.firstName?.[0] ?? ""}
                    {reduxUser?.lastName?.[0] ?? ""}
                  </span>
                )}
              </div>

              <div>
                <label className="cursor-pointer text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="hidden"
                  />
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG allowed. Max 2MB.
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  defaultValue={reduxUser?.firstName}
                  type="text"
                  placeholder="First Name"
                  className={`border p-3 rounded-lg outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  {...register("lastName", {
                    required: "last name is required",
                  })}
                  defaultValue={reduxUser?.lastName}
                  type="text"
                  className={`border p-3 rounded-lg outline-none focus:ring-2 ${
                    errors.lastName
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                {...register("email", {
                  required: "email is required",
                })}
                defaultValue={reduxUser?.email}
                type="email"
                className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-error focus:ring-error"
                    : "border-gray-300 focus:ring-primary"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg cursor-pointer hover:bg-buttonSec transition"
              onClick={() => {
                // setSelectedUserId(user.id);
                setOpenUpdateModal(true);
              }}
            >
              Update Profile
            </button>
          </form>

          <form
               onSubmit={(e) => {
              e.preventDefault();
              setOpenChangeModal(true);
            }}
            className="space-y-4 mt-10"
          >
            <p className="font-bold text-xl">Change Password</p>

            <div className="flex flex-col">
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Current Password"
                  {...passwordRegister("currentPassword", {
                    required: "Current password is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 ${
                    passwordErrors.currentPassword
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {showPassword.current ? (
                  <Eye
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: false,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                ) : (
                  <EyeClosed
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: true,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                )}
              </div>

              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="New Password"
                  {...passwordRegister("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 ${
                    passwordErrors.newPassword
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {showPassword.new ? (
                  <Eye
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: false,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                ) : (
                  <EyeClosed
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: true,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                )}
              </div>

              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...passwordRegister("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                  className={`w-full px-4 py-3 border rounded-xl transition focus:outline-none focus:ring-2 ${
                    passwordErrors.currentPassword
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {showPassword.confirm ? (
                  <Eye
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: false,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                ) : (
                  <EyeClosed
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: true,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500"
                  />
                )}
              </div>

              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg cursor-pointer hover:bg-red-500"
              onClick={() => {
                // setSelectedUserId(user.id);
                setOpenChangeModal(true);
              }}
            >
              Update Password
            </button>
          </form>
        </div>

        {/* For updated profile */}
        <ConfirmDialog
          open={openUpdateModal}
          title="Update Profile"
          description="Are you sure you want to update profile?"
          color="primary"
          onConfirm={() => handleSubmit(onSubmit)()}
          onCancel={() => setOpenUpdateModal(false)}
        />

        {/* for change password */}
        <ConfirmDialog
          open={openChangeModal}
          title="Change Password"
          description="Are you sure you want to change Password?"
          onConfirm={() => handlePasswordSubmit(onSubmitPassword)()}
          onCancel={() => setOpenChangeModal(false)}
          color="error"
        />
      </div>
    </div>
  );
}
