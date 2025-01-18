import { FileTooLargeError } from '@/utils/CustomError';
import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from "uuid";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {   
    cb(null, './public/temp'); 
  },
  filename: (_req, file:Express.Multer.File, cb) => {
    cb(null, `${uuidv4()}-${path.extname(file.originalname)}`); 
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new FileTooLargeError('Invalid file type. Only JPEG, PNG, and webp are allowed.',"multer error"));
  }
};


const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, 
  fileFilter,
});

export default upload;
