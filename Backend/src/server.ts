import dotenv from "dotenv";
dotenv.config();


import "./config/cloudinary.js";


import express from "express";
import sequelize from "./connections/database.js";
import "./models/Index.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import studentRoute from "./routes/student.js"
import courseRoute from "./routes/course.js"
import dashboardRoute from "./routes/dashboard.js"
import cors from "cors";



const app = express();
const port = process.env.PORT || 3000;

app.use("/uploads",express.static('uploads')); // for images

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,  // "http://localhost:5173",
  })
);

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", authRoute);
app.use("/api", userRoute)
app.use("/api", studentRoute)
app.use("/api", courseRoute)
app.use("/api", dashboardRoute)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});