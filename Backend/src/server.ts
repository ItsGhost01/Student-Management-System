import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize from "./connections/database.js";
import "./models/Index.js"
import authRoute from "./routes/auth.js"


const app = express();
const port = 3000;

app.use(express.json())

app.use("/api", authRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});