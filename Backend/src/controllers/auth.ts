import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signupSchema, loginSchema, forgetPassSchema, changePasswordSchema } from "../../validation/auth.js";
import jwt from "jsonwebtoken";
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
      },
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
    const existingUser = await User.findOne({
      where: { email: result.data.email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash Password
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
};

export const forgotPassword = async (req: Request, res: Response) => {
  const validatedData = forgetPassSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      success: false,
      errors: z.flattenError(validatedData.error).fieldErrors,
    });
  }

  try {
    const { email, password } = validatedData.data;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const changePassword = async (req: Request, res: Response) => {
  const validated = changePasswordSchema.safeParse(req.body);

  if (!validated.success) {
    return res.status(400).json({
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    });
  }

  try {
    const { currentPassword, newPassword } = validated.data;

    const user = await User.findByPk(req.user.id) as any;

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    return res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};