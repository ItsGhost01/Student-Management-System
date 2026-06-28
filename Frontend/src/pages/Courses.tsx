import { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ConfirmDialog from "./ConfirmDialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSearchParams } from "react-router";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  type FormValues = {
    title: string;
    description: string;
    duration: string;
  };

  const form = useForm<FormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/api/add/course", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Courses added successfully");
      fetchCourses();

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add course");
    }
  };

  const fetchCourses = async () => {
    const searchText = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "latest";

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/api/courses?q=${searchText}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setCourses(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/courses/${selectedUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Course deleted successfully");
    setOpenModal(false);
    setSelectedUserId(null);

    await fetchCourses();
  } catch (error: any) {
    console.error(error);
    toast.error(
    error.response?.data?.message || "Failed to delete course."
  );
  }
};

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Courses
            </h1>

            <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
              {courses.length} Total
            </span>
          </div>

          <p className="mt-2 text-sm md:text-base text-gray-500">
            Manage courses and enrollment records.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full md:w-auto px-4 py-3 text-white bg-primary rounded-lg shadow hover:bg-buttonSec flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Course
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}

          <form>
            <div className="relative w-full max-w-sm">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={searchParams.get("q") || ""}
                type="text"
                name="q"
                onChange={(e) => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);

                    if (e.target.value) {
                      params.set("q", e.target.value);
                    } else {
                      params.delete("q");
                    }

                    return params;
                  });
                }}
                placeholder="Search by course..."
                className="w-full h-11 pl-12 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Filter:
            </label>

            <select
              value={searchParams.get("sort") || "latest"}
              className="w-full sm:w-40 h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => {
                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("sort", e.target.value);
                  return params;
                });
              }}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-4 text-center text-black text-2xl relative">
          <DotLottieReact
            src="/Loading.lottie"
            loop
            autoplay
            className="h-auto"
          />

          <p>Loading...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="py-4 text-center text-black text-2xl relative">
          <DotLottieReact
            src="/nodata.lottie"
            loop
            autoplay
            className="h-auto"
          />
          <p className="font-bold">No course Data Found</p>
        </div>
      ) : (
        <TableContainer className="mt-3 " component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CourseId</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>created by</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.courseId}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>
                    {" "}
                    {course.creator?.firstName} {course.creator?.lastName}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedUserId(course.id);
                        setOpenModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ConfirmDialog
        open={openModal}
        title="Delete Course"
        description="Are you sure you want to delete this Course?"
        onConfirm={handleDelete}
        onCancel={() => setOpenModal(false)}
        color="error"
      />
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-4 sm:p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Add Course</h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 font-medium">
                  Course Title <span className="text-error">*</span>
                </label>

                <input
                  {...register("title", {
                    required: "Title is Required",
                  })}
                  type="text"
                  placeholder="Node.js Fundamentals"
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.title && (
                  <p className="text-error text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">
                  Description <span className="text-error">*</span>
                </label>

                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.description
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.description && (
                  <p className="text-error text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-1 font-medium">
                  Duration <span className="text-error">*</span>
                </label>

                <input
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  type="text"
                  placeholder="e.g. 8 Weeks"
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.duration
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.duration && (
                  <p className="text-error text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg"
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
