import type { Request, Response } from "express";
import Courses from "../models/Course.js";
import Students from "../models/Student.js";
import { Op } from "sequelize";
import User from "../models/User.js";


export const addCourse = async (req:Request, res: Response ) => {

try {
const courses = await Courses.create({
    title : req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    createdBy: req.user.id,
});

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      courses
    });

} catch (error) {
    return res.status(500).json({
        success: false,
        message: "failed to create product",
        error,
    });
}
};



export const getCourse = async (
  req: Request,
  res: Response
) => {
  try {
    let limit = 0;
    let page = 1;
    let sort: [string, "ASC" | "DESC"] = [
      "createdAt",
      "DESC",
    ];
    let searchText = "";

    if (req.query.q) {
      searchText = req.query.q as string;
    }

    if (req.query.page) {
      page = parseInt(req.query.page as string);
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
    }

    if (req.query.sort === "oldest") {
      sort = ["createdAt", "ASC"];
    }

    const offset = (page - 1) * limit;

    const courseData = await Courses.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${searchText}%`,
        },
      },

       include: [
    {
      model: User,
      as: "creator",
      attributes: ["firstName", "lastName"],
    },
  ],
       
      order: [sort],
      limit,
      offset,
    });

    return res.status(200).json({
      success: true,
      total: courseData.count,
      data: courseData.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error,
    });
  }
};