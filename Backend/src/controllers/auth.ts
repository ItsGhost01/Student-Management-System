import type { Request, Response } from "express";
import User from "../models/User.js";
// import bcrypt from 'bcrypt';
// import jwt, { JwtPayload } from "jsonwebtoken"


export const login = async (req: Request, res: Response) => {
  res.send("login")
}

export const signup = async (req: Request, res: Response) => {
 res.send("signup")
 
}

export const getUser = async (req: Request, res: Response) => {
  res.send("getuser")
  }