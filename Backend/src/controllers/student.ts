import type { Request, Response } from "express";
import Student from "../models/Student.js";
import { Op } from "sequelize";
import Courses from "../models/Course.js";
import fs from "fs";
import path from "path";

export const addStudent = async (req: Request, res: Response) => {
  try {
    // Check if email already exists first
    const existingStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const students = await Student.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: req.file?.filename,
      courseId: req.body.courseId,
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
    let course = "";
    let searchText = "";
    let sort: [string, "ASC" | "DESC"] = ["createdAt", "DESC"];

    if (req.query.course) {
      course = req.query.course as string;
    }

    if (req.query.student) {
      searchText = req.query.student as string;
    }

    if (req.query.sort === "oldest") {
      sort = ["createdAt", "ASC"];
    }

    const where: any = {
      name: {
        [Op.iLike]: `%${searchText}%`,
      },
    };

    if (course) {
      where.courseId = course;
    }
    const studentData = await Student.findAndCountAll({
      where,
      include: [
        {
          model: Courses,
          as: "course",
          attributes: ["id", "courseId", "title"],
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

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const student = await Student.findByPk(id, {
      include: [
        {
          model: Courses,
          as: "course",
          attributes: ["id", "courseId", "title"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error,
    });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;

    const deleted = await Student.destroy({
      where: { id: studentId },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Student Id not found",
      });
    } else {
      return res.status(200).json({
        message: "Student Deleted Succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const student = (await Student.findByPk(id)) as any;

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Delete old image if new image uploaded
    if (req.file && student.image) {
      const imagePath = path.join(
        __dirname,
        "../../uploads/students",
        student.image,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await student.update({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      courseId: req.body.courseId,
      image: req.file ? req.file.filename : student.image,
    });

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
