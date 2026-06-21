import type { Request, Response } from "express";
import Courses from "../models/Course.js";


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

