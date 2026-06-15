import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { signupSchema, loginSchema} from "../../validation/auth.js";
import jwt from "jsonwebtoken"
import z from "zod";



//api for login
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({
      where: {
        email: validatedData.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    const hashedPw = user.getDataValue("password"); 

    const matched = await bcrypt.compare(validatedData.password, hashedPw);

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userInfo = user.toJSON(); // to convert sequelize model to js object
    delete userInfo.password; // for not showing password in response

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


export const signup = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  try {
    const hashedPw = await bcrypt.hash(result.data.password, 10);

    await User.create({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      password: hashedPw,
      role: result.data.role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
 return res.status(200).json({
    success: true,
    user: req.user,
  });
  }