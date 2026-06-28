import type { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import User from "../models/User.js";
// import User from "../models/User.js";

export const updateProfile = async (req: Request, res: Response) => {


  try {

    const { firstName, lastName, email } = req.body;

    if (firstName) req.user.firstName = firstName;
    if (lastName) req.user.lastName = lastName;
    if (email) req.user.email = email;

 
if (req.file) {
      req.user.image = `uploads/users/${req.file.filename}`;
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// User Data
export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
   
    let sort: [string, "ASC" | "DESC"] = [
      "createdAt",
      "DESC",
    ];
    let searchText = "";
    let role = req.query.role as string | undefined;

    if (req.query.q) {
      searchText = req.query.q as string;
    }

    if (req.query.sort === "oldest") {
      sort = ["createdAt", "ASC"];
    }


 const userData = await User.findAndCountAll({
  where: {
    ...(role && { role }),   

    [Op.or]: [
      {
        firstName: {
          [Op.iLike]: `%${searchText}%`,
        },
      },
      {
        lastName: {
          [Op.iLike]: `%${searchText}%`,
        },
      },
      Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("first_name"),
          " ",
          Sequelize.col("last_name")
        ),
        {
          [Op.iLike]: `%${searchText}%`,
        }
      ),
    ],
  },

  attributes: {
    exclude: ["password", "image"],
  },

  order: [sort],
});
  
    return res.status(200).json({
      success: true,
      total: userData.count,
      data: userData.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error,
    });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

const deleted = await User.destroy({
  where: {id: userId}
})

if(!deleted) {
  return res.status(404).json({
    message: "User Id not found",
  })
} else {
  return res.status(200).json({
    message: "User Deleted Succesfully"
  })
}
  } catch(error){
    console.log(error);
    return res.status(500).json({
      message: "server error"
    })
  }
}