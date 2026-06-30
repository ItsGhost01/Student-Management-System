import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { FormValues } from "../components/StudentFormModal";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import ConfirmDialog from "../components/ConfirmDialog";
import { useSearchParams } from "react-router";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import StudentViewModal from "../components/StudentViewModal";
import StudentFormModal from "../components/StudentFormModal";
import type { SubmitHandler } from "react-hook-form";

interface Course {
  id: number;
  title: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  image: string;
  courseId: number;
  // course: {
  //   title: string;
  // };
}

// import { useState } from "react";

export default function Students() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

const [addLoading, setAddLoading] = useState(false);
const [editLoading, setEditLoading] = useState(false);

  // Add Student
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
      setAddLoading(true);

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
      await axios.post("${import.meta.env.VITE_API_URL}/api/add/student", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student added Succesfully");

      setOpen(false);
      fetchStudent();
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else {
        console.log("FULL ERROR:", error);
         toast.error(error.response?.data?.message || "Failed to update student");
      }
    }
    finally {
    setAddLoading(false);
  }
 
  };

  // update student
  // console.log(typeof selectedStudent);

  const onUpdate: SubmitHandler<FormValues> = async (data) => {
    setEditLoading(true);
    if (!selectedStudent) return;

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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/student/${selectedStudent?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Student updated successfully");

      setEditOpen(false);
      setSelectedStudent(null);

      fetchStudent();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update student");
    }   finally {
    setEditLoading(false);
  }
  };

  const fetchCourse = async () => {
    const token = localStorage.getItem("token");

    axios
      .get("${import.meta.env.VITE_API_URL}/api/courses", {
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
  };

  const fetchStudent = async () => {
    const searchText = searchParams.get("student") || "";
    const sort = searchParams.get("sort") || "latest";
    const course = searchParams.get("course") || "";
    const token = localStorage.getItem("token");

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/students?student=${searchText}&sort=${sort}&course=${course}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setStudents(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCourse();
    fetchStudent();
  }, [searchParams]);

  // function handleSearch(e: any) {
  //   e.preventDefault();

  //   const value = e.target.searchText.value;

  //   setSearchParams((prev) => {
  //     const newParams = new URLSearchParams(prev);
  //     newParams.set("student", value);
  //     return newParams;
  //   });
  // }

  //Delete
  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/student/${selectedStudentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOpenModal(false);
      //refresh user list after deleting
      toast.success("Student deleted Succesfully");
      await fetchStudent();
    } catch (error) {
      toast.error("Failed to delete Student");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>

            <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
              Total {student.length}
            </span>
          </div>

          <p className="mt-2 text-gray-500">Manage Students</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 text-white bg-primary rounded-lg shadow cursor-pointer hover:bg-buttonSec flex items-center gap-2 w-fit"
        >
          <Plus className="h-5 w-5" />
          Add Student
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <form>
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="student"
                type="text"
                onChange={(e) => {
                  setSearchParams({ student: e.target.value });
                }}
                placeholder="Search by student name..."
                className="w-full h-11 pl-12 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Course Filter */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium whitespace-nowrap">
                Course:
              </label>

              <select
                value={searchParams.get("course") || ""}
                className="h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);

                    if (e.target.value) {
                      params.set("course", e.target.value);
                    } else {
                      params.delete("course");
                    }

                    return params;
                  });
                }}
              >
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

              <select
                value={searchParams.get("sort") || "latest"}
                className="h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
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
      ) : student.length === 0 ? (
        <div className="py-4 text-center text-black text-2xl relative">
          <DotLottieReact
            src="/nodata.lottie"
            loop
            autoplay
            className="h-auto"
          />
          <p className="font-bold">No Student Data Found</p>
        </div>
      ) : (
        <TableContainer className="mt-3 " component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>StudentId</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Course</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {student.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Avatar
                      // src={`${import.meta.env.VITE_API_URL}/uploads/students/${student.image}`}
                      // alt="image"
                      src={student.image}
                      alt="image"
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.course.title}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedStudent(student);
                        setViewOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedStudent(student);
                        setEditOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setOpenModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <ConfirmDialog
                open={openModal}
                title="Delete Student"
                description="Are you sure you want to delete this student?"
                onConfirm={handleDelete}
                onCancel={() => setOpenModal(false)}
                color="error"
              />
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <StudentViewModal
        open={viewOpen}
        student={selectedStudent}
        onClose={() => setViewOpen(false)}
      />

      <StudentFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        courses={courses}
        title="Add Student"
        submitText="Add Student"
         loading={addLoading}
      />

      <StudentFormModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedStudent(null);
        }}
        onSubmit={onUpdate}
        courses={courses}
        student={selectedStudent}
        title="Edit Student"
        submitText="Update Student"
         loading={editLoading}
      />
    </div>
  );
}
