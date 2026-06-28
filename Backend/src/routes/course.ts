import express from "express";
import { addCourse, deleteCourse, getCourse } from "../controllers/course.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";


const router = express.Router();

router.post("/add/course", checkAuthentication, addCourse);
router.get("/courses", checkAuthentication, getCourse);
router.delete("/courses/:id", checkAuthentication, deleteCourse);

export default router;