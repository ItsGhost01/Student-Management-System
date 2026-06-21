import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Courses() {
  const [open, setOpen] = useState(false);

  type FormValues = {
    title: string;
    description: string;
    duration: string;
  };
  

  const form = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = form;


  const onSubmit: SubmitHandler<FormValues> = async (data) => {

     const token = localStorage.getItem("token");

    try {
    await axios.post("http://localhost:3000/api/add/course", 
      data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );
    toast.success("Courses added Succesfully")
    setOpen(false);
  }
  
  catch (error) {
    console.log(error)
    toast.error("failed to add courses")
  }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>

            <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
              100 Total
            </span>
          </div>

          <p className="mt-2 text-gray-500">
            Manage courses and enrollment records.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-3 py-3 text-white bg-primary rounded-lg shadow hover:bg-buttonSec flex gap-1"
        >
          <Plus className="h-5" />
          Add Course
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Add Course</h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Course Title <span className="text-error">*</span></label>

                <input
                  {...register("title", { required: "Title is Required" })}
                  type="text"
                  placeholder="Node.js Fundamentals"
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-error focus:ring-error focus:border-error"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
                {errors.title && (
                  <p className="text-error text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Description <span className="text-error">*</span></label>

                <textarea
                  {...register("description", { required: "description is required" })}
                  rows={4}
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-error focus:ring-error focus:border-error"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
                {errors.description && (
                <p className="text-error text-sm mt-1">{errors.description.message}</p> 
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Duration <span className="text-error">*</span></label>

                <input
                  {...register("duration", { required: "duration is required"})}
                  type="text"
                  placeholder="eg. 8 Weeks"
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.duration
                      ? "border-error focus:ring-error focus:border-error"
                      : "border-gray-300 focus:ring-primary focus:border-primary"
                  }`}
                />
                {errors.duration && (
                  <p className="text-error text-sm mt-1">{errors.duration.message} </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
