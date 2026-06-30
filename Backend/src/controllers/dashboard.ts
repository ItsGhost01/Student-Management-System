import type { Request, Response } from "express";
import Courses from "../models/Course.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalStudents = await Student.count();
    const totalCourses = await Courses.count();
    const totalUser = await User.count()

    const totalStaff = await User.count({
      where: {
        role: "staff",
      },
    });

    const totalAdmins = await User.count({
      where: {
        role: "admin",
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalUser,
        totalStaff,
        totalAdmins,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};


export const getStudentsPerCourse = async (
  req: Request,
  res: Response
) => {
  try {
    const courses = await Courses.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: Student,
          as: "students",
          attributes: [],
        },
      ],
    });

    const data = await Promise.all(
      courses.map(async (course: any) => ({
        course: course.title,
        students: await Student.count({
          where: {
            courseId: course.id,
          },
        }),
      }))
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch chart data",
    });
  }
};



export const getRecentStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await Student.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Courses,
          as: "course",
          attributes: ["title"],
        },
      ],
      attributes: ["id", "studentId", "name", "image", "createdAt"],
    });

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent students",
    });
  }
};