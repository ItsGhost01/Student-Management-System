import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize from "./connections/database.js";
import "./models/Index.js"
import authRoute from "./routes/auth.js"
import cors from "cors";


const app = express();
const port = 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json())

app.use("/api", authRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});