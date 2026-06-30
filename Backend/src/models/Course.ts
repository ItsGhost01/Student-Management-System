import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const Courses = sequelize.define(
  "Courses",
  {
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

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
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

  const random = Math.floor(100000 + Math.random() * 900000);

  course.courseId = `CRS-${yymmdd}-${random}`;
});

export default Courses;
