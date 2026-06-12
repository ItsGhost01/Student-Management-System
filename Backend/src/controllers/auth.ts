import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { signupSchema } from "../../validation/auth.js";
import jwt from "jsonwebtoken"



////api for login
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const hashedPw = user.getDataValue("password");

    const matched = await bcrypt.compare(req.body.password, hashedPw);

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userInfo = user.toJSON();
    delete userInfo.password;

    const token = jwt.sign(
      {
        id: userInfo.id,
        role: userInfo.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );


    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userInfo,
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};


//api for signup
export const signup = async (req: Request, res: Response) => {
  try {
      console.log(req.body);
    const validatedData = signupSchema.parse(req.body);
 
   let hashedPw = await bcrypt.hash(validatedData.password, 10);

    await User.create({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPw,
      role:validatedData.role
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {

    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
  const errors: Record<string, string> = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as string;

    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  return res.status(400).json({
    success: false,
    errors,
  });
}
 
  }
}

export const getUser = async (req: Request, res: Response) => {
  res.send("getuser")
  }