import axios from "axios";
import { Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
// import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  age: number;
  image: FileList;
  courseId: number;
};

interface Course {
  id: number;
  title: string;
}

export default function Students() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const form = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", String(data.age));
    formData.append("courseId", String(data.courseId));

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await axios.post("http://localhost:3000/api/add/student", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student added Succesfully");
      setOpen(false);
    } catch (error) {
      console.log(error);

      toast.error("failed to add student");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>

            <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
              100 Total
            </span>
          </div>

          <p className="mt-2 text-gray-500">Manage Students</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 text-white bg-primary rounded-lg shadow hover:bg-buttonSec flex items-center gap-2 w-fit"
        >
          <Plus className="h-5 w-5" />
          Add Student
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by student name..."
              className="w-full h-11 pl-12 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Course Filter */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium whitespace-nowrap">
                Course:
              </label>

              <select className="h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Courses</option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium whitespace-nowrap">
                Sort:
              </label>

              <select className="h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Add Student</h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">
                  Name <span className="text-error">*</span>
                </label>

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.name ? "border-error" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">
                  Email <span className="text-error">*</span>
                </label>

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="john@gmail.com"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.email ? "border-error" : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block mb-1 font-medium">
                  Age <span className="text-error">*</span>
                </label>

                <input
                  {...register("age", {
                    required: "Age is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Age must be greater than 0",
                    },
                  })}
                  type="number"
                  min={0}
                  placeholder="20"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.age ? "border-error" : "border-gray-300"
                  }`}
                />

                {errors.age && (
                  <p className="text-error text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-1 font-medium">Upload Image</label>

                <input
                  {...register("image")}
                  type="file"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block mb-1 font-medium">
                  Course <span className="text-error">*</span>
                </label>

                <select
                  {...register("courseId", {
                    required: "Course is required",
                    valueAsNumber: true,
                  })}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.courseId ? "border-error" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Course</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>

                {errors.courseId && (
                  <p className="text-error text-sm mt-1">
                    {errors.courseId.message}
                  </p>
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
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
