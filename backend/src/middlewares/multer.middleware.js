// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp')
//   },
//   filename: function (req, file, cb) {
    
//     cb(null, file.originalname)
//   }
// })

// export const upload = multer({storage,})




import multer from "multer";
import os from "os";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = os.tmpdir();  
    cb(null, tempDir);
  },
});

export const upload = multer({ storage });
// const tempDir = os.tmpdir()