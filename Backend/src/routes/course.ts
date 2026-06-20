import express from "express";
import { addCourse } from "../controllers/course.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";


const router = express.Router();

router.post("/add/course", checkAuthentication, addCourse);

export default router;