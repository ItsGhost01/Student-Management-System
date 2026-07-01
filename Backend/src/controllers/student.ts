import type { Request, Response } from "express";
import Student from "../models/Student.js";
import { Op } from "sequelize";
import Courses from "../models/Course.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const addStudent = async (req: Request, res: Response) => {
  try {
console.log("BODY:", req.body);
console.log("FILE:", req.file);
console.log("Cloudinary:", cloudinary.config());

    const existingStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.log("CLOUDINARY:", cloudinary.config());

let imageUrl = "";

if (req.file?.path) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "students",
  });

  imageUrl = result.secure_url;

  // ✅ delete local file AFTER upload
  fs.unlinkSync(req.file.path);
}

    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: imageUrl,
      courseId: req.body.courseId,
    });

    return res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    console.log("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
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

    let imageUrl = student.image;

    // if new image uploaded → upload to cloudinary

 if (req.file?.path) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "students",
  });

  imageUrl = result.secure_url;

    // ✅ delete local file AFTER upload
  fs.unlinkSync(req.file.path);
} 
 

    await student.update({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      courseId: req.body.courseId,
      image: imageUrl, //req.file ? req.file.filename : student.image,
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
