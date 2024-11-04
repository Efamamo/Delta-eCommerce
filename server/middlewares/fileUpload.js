import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Define allowed MIME types and their corresponding extensions
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/avif': 'avif',
  'image/webp': 'webp',
};

// Configure multer storage
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images'); // Set the upload directory
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPES[file.mimetype];
      cb(null, uuidv4() + '.' + ext); // Use UUID for unique filenames
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPES[file.mimetype];
    const error = isValid ? null : new Error('Invalid image type');
    cb(error, isValid);
  },
});

// Middleware to handle both single 'image' and multiple 'sub_images' uploads
export const uploadImages = fileUpload.fields([
  { name: 'image', maxCount: 1 }, // Single main image
  { name: 'sub_images', maxCount: 5 }, // Up to 5 additional images in 'sub_images'
]);

export default uploadImages;
