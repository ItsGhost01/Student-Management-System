import express from "express";
import { login, signup, getUser } from "../controllers/auth.js";


const router = express.Router();

// only endpoints here (NO /api)
router.post("/login", login);
router.post("/signup", signup);
router.get("/me", getUser);

export default router;