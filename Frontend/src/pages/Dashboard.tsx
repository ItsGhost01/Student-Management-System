import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import axios from "axios";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

interface DashboardInfo {
  totalStudents: number;
  totalCourses: number;
  totalUser: number;
  totalStaff: number;
  totalAdmins: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  course: {
    title: string;
  };
}

interface StudentPerCourse {
  course: string;
  students: number;
}

export default function Dashboard() {
  const [info, setInfo] = useState<DashboardInfo | null>(null);
  const [recentStudent, setRecentStudent] = useState<Student[]>([]);
  const [studentPerCourse, setStudentPerCourse] = useState<StudentPerCourse[]>(
    [],
  );

  const reduxUser = useSelector((state: RootState) => state.user.value);

  const fetchDashboardInfo = async () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const fetchStudentPerCourse = async () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/dashboard/students-per-course", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudentPerCourse(res.data.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const fetchRecentStudent = async () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/dashboard/recent-students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecentStudent(res.data.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  // fetch every api
  useEffect(() => {
    fetchDashboardInfo();
    fetchRecentStudent();
    fetchStudentPerCourse();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome to the Student Management System
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="relative bg-primary rounded-3xl p-6 shadow-xl overflow-hidden ">
        {/* Decorative Shapes */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-full"></div>

        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-white text-3xl md-text- font-bold leading-tight">
              Welcome to StudentHub
            </h2>

            <p className="hidden md:block text-white text-2xl font-medium mt-4">
              Mr. {reduxUser?.firstName} {reduxUser?.lastName}
            </p>

            <p className="text-white/80 text-lg mt-3 max-w-xl">
              Manage students, courses, and system settings from one place.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center flex-1">
            <DotLottieReact
              src="/dashboard.lottie"
              loop
              autoplay
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Students</p>
          <h3 className="text-3xl font-bold mt-2">{info?.totalStudents}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <h3 className="text-3xl font-bold mt-2">{info?.totalCourses}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <p className="text-gray-500 text-sm">Active Users</p>
          <h3 className="text-3xl font-bold mt-2">{info?.totalUser}</h3>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">User Roles</h2>

        <div className="w-64 mx-auto">
          <DonutChart
            totalStaff={info?.totalStaff ?? 0}
            totalAdmins={info?.totalAdmins ?? 0}
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Student Per Course</h2>

        <div className="w-auto mx-auto">
          <BarChart data={studentPerCourse} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Recent Students</h2>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Course</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentStudent?.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Avatar
                      src={`http://localhost:3000/uploads/students/${student.image}`}
                      alt={student.name}
                      sx={{ width: 45, height: 45 }}
                    />
                  </TableCell>

                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.course?.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
