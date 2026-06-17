import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const Courses = sequelize.define(
  "Courses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    courseId: {
      type: DataTypes.STRING,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "courses",
    underscored: true,
  },
);

Courses.beforeCreate(async (course: any) => {
  const date = new Date();

  const yymmdd =
    String(date.getFullYear()).slice(2) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  const random = Math.floor(1000 + Math.random() * 9000);

  course.courseId = `CRS-${yymmdd}-${random}`;
});

export default Courses;
