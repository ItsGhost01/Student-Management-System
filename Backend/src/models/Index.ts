import Students from "./Student.js";
import User from "./User.js";
import Courses from "./Course.js";


User.hasMany(Courses, {
  foreignKey: "createdBy",
});

Courses.belongsTo(User, {
  foreignKey: "createdBy",
});