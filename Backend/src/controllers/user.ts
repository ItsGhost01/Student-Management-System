import type { Request, Response } from "express";
// import User from "../models/User.js";

export const updateProfile = async (req: Request, res: Response) => {


  try {

  

    const { firstName, lastName, email } = req.body;

    if (firstName) req.user.firstName = firstName;
    if (lastName) req.user.lastName = lastName;
    if (email) req.user.email = email;

 
if (req.file) {
      req.user.image = `uploads/users/${req.file.filename}`;
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};