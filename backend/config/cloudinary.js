import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import User from '../models/AuthModel.js'; // Import the User model

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Fetch user data from the User model
    const user = await User.findById(req.body.user); // Assuming `user` is passed in the request body
    if (!user) {
      throw new Error('User not found'); // Handle case where user is not found
    }

    const { firstName, lastName } = user; // Extract firstName and lastName from the user model
    const fileName = `${firstName}_${lastName}`; // Combine firstName and lastName for the file name

    return {
      folder: 'docucare/patients', // Folder in Cloudinary
      public_id: fileName, // Use the combined name as the public ID
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
      resource_type: 'image',
    };
  },
});

const upload = multer({ storage });

export default upload;