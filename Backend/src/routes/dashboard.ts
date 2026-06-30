import express from "express";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";
import { getDashboardStats, getRecentStudents, getStudentsPerCourse } from "../controllers/dashboard.js";

const router = express.Router();

// only endpoints here (NO /api)

router.get("/dashboard", checkAuthentication, getDashboardStats);
router.get("/dashboard/recent-students", checkAuthentication, getRecentStudents);
router.get("/dashboard/students-per-course", checkAuthentication, getStudentsPerCourse);

export default router;
