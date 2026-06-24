import type { Request, Response } from "express";
import Student from "../models/Student.js";
import { Op } from "sequelize";
import Courses from "../models/Course.js";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const students = await Student.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        image: req.file?.filename,
        courseId: req.body.courseId
    });

    return res.status(201).json({
      success: true,
      message: "Student Added successfully",
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to add student",
      error,
    });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    let searchText = "";
    let sort: [string, "ASC" | "DESC"] = ["createdAt", "DESC"];

    if (req.query.q) {
      searchText = req.query.q as string;
    }

    if (req.query.sort === "oldest") {
      sort = ["createdAt", "ASC"];
    }

    const studentData = await Student.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${searchText}%`,
        },
      },

      include: [
    {
      model: Courses,
      as: "course",
      attributes: ["title"],
    },
  ],
      order: [sort],
    });

    return res.status(200).json({
      success: true,
      total: studentData.count,
      data: studentData.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error,
    });
  }
};