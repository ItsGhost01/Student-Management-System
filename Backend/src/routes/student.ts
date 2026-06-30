import express from "express";
import { addStudent, deleteStudent, getStudent, getStudentById, updateStudent } from "../controllers/student.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

 // Multer setup
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/students");
//   },
//   filename: function (req, file, cb) {
//     const extension = path.extname(file.originalname);
//     const uniqueSuffix =
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

router.post("/add/student", checkAuthentication, upload.single("image"), addStudent);
router.get("/students", checkAuthentication, getStudent);
router.get("/student/:id", checkAuthentication, getStudentById);
router.delete("/student/:id", checkAuthentication, deleteStudent);
router.put("/student/:id", checkAuthentication, upload.single("image"), updateStudent);

export default router;