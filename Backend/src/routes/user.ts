import express from "express";
import { getUsers, updateProfile } from "../controllers/user.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";
import multer from "multer";
import path from "path";


const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.put("/profile", checkAuthentication, upload.single("image"), updateProfile);
router.get("/users", checkAuthentication, getUsers);


export default router;