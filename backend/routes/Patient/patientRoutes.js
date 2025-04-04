import express from 'express';
import {
  createOrUpdatePatient,
  getPatientById,
  getMedicalHistory,
  getAllDoctors,
} from '../../controller/Patient/patientController.js';
import { VerifyToken } from '../../middleware/auth.js'; // Import the middleware
import upload from '../../config/cloudinary.js'; // Import Multer middleware for file uploads

const patientRouter = express.Router();

// Routes
patientRouter
  .route('/')
  .post(
    VerifyToken(['Admin', 'Patient']),
    upload.single('profilePicture'), // Middleware to handle file uploads
    createOrUpdatePatient
  ); // Admins and patients can create or update patient data

patientRouter
  .route('/:id')
  .get(VerifyToken(['Patient', 'Admin']), getPatientById); // Patients and admins can access patient data

patientRouter
  .route('/:id/medical-history')
  .get(VerifyToken(['Patient', 'Doctor']), getMedicalHistory); // Patients and doctors can view medical history

patientRouter
  .route('/doctors')
  .get(VerifyToken(['Patient', 'Admin']), getAllDoctors); // Patients and admins can view all doctors

export default patientRouter;