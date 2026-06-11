import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const User = sequelize.define(
  "Users",
  {
      studentId: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "staff"),
      defaultValue: "admin",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    underscored: true,
  },
);

export default User;
