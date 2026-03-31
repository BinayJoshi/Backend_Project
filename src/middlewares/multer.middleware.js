import multer from "multer" 
//multer is a middleware for handling multipart/form-data(images, PDFs, videos), which is primarily used for uploading files.While Express can easily parse JSON (text)or URL-encoded data, it cannot handle file uploads on its own 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

export const upload = multer({
     storage,
})