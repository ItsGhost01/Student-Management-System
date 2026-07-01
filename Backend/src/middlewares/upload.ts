// import multer from "multer";


// // store file temporarily in memory or disk

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "temp/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from "multer";
import fs from "fs";

// Create temp folder if it doesn't exist
fs.mkdirSync("temp", { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;