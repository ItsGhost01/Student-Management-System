import type { Request, Response } from "express";
import Students from "../models/Student.js";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const students = await Students.create({
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
