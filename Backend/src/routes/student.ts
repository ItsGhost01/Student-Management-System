import express from "express";
import { addStudent, deleteStudent, getStudent, getStudentById } from "../controllers/student.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/students");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post("/add/student", checkAuthentication, upload.single("image"), addStudent);
router.get("/students", checkAuthentication, getStudent);
router.get("/student/:id", checkAuthentication, getStudentById);
router.delete("/student/:id", checkAuthentication, deleteStudent);

export default router;