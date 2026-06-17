import express from "express";
import { login, signup, getUser, forgotPassword} from "../controllers/auth.js";
import { checkAuthentication } from "../middlewares/CheckAuthentication.js";


const router = express.Router();

// only endpoints here (NO /api)
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.get("/me", checkAuthentication, getUser);

export default router;