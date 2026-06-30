import { Sequelize } from "sequelize";

//  const sequelize = new Sequelize(
//  process.env.LOCALDATABASE_URL!,
//   {
//     logging: false,
//   }
// );

const sequelize = process.env.NODE_ENV === "production"
  ? new Sequelize(process.env.DATABASE_URL!, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize(
      process.env.LOCALDATABASE_URL!,{
        dialect: "postgres",
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
