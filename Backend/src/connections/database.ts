import { Sequelize } from "sequelize";

 const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5439/studentmanagementsystem",
  {
    logging: false,
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ alter: true, force:true});

    console.log("Connection established successfully");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

connectDB();

export default sequelize
