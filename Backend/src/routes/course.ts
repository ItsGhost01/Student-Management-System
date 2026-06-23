import express from "express";
import { addCourse, getCourse } from "../controllers/course.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";


const router = express.Router();

router.post("/add/course", checkAuthentication, addCourse);
router.get("/courses", checkAuthentication, getCourse);

export default router;