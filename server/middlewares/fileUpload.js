import multer from 'multer';
import { v4 } from 'uuid';
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/avif': 'avif',
  'image/webp': 'webp',
};
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ex = MIME_TYPES[file.mimetype];

      cb(null, v4() + '.' + ex);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPES[file.mimetype];
    const error = isValid ? null : new Error('invalid image type');
    cb(error, isValid);
  },
});

export default fileUpload;