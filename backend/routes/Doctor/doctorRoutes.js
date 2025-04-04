import express from 'express';
import {
  createDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../../controller/Doctor/doctorController.js';

const doctorRouter = express.Router();

doctorRouter
  .route('/')
  .post(createDoctor);

doctorRouter
  .route('/:id')
  .get(getDoctorById)
  .put(updateDoctor)

export default doctorRouter;