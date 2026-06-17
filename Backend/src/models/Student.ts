import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

// interface StudentAttributes {
//   id?: number;
//   studentId?: string;
//   name: string;
//   email: string;
//   age: number;
//   image?: string;
// }

const Students = sequelize.define(
  "Students",
  {  
    studentId: {
  type: DataTypes.STRING,
  unique: true,
},
    name: {
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
       image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   
  },
  {
    timestamps: true,
    tableName: "students",
    underscored: true,
  },
);



// 👇 PUT THIS HERE (after model definition)
Students.beforeCreate(async (student: any) => {
  const count = await Students.count();

  const number = String(count + 1).padStart(2, "0");

  const date = new Date();
  const yymmdd =
    String(date.getFullYear()).slice(2) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  student.studentId = `STU-${yymmdd}(${number})`;
});

export default Students;
