import Students from "./Student.js";
import User from "./User.js";
import Courses from "./Course.js";

User.hasMany(Courses, {
  foreignKey: "createdBy",
  as: "courses",
});

Courses.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

Students.belongsTo(Courses, {
  foreignKey: "courseId",
  as: "course",
});

Courses.hasMany(Students, {
  foreignKey: "courseId",
  as: "students",
});