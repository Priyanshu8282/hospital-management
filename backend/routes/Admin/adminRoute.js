import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllAppointments,
  deleteAppointment,
  getAllBills,
  deleteBill,
  updateDoctorStatus,
  getAllDoctors,
  getAllPatients,
  updatePatient,
  deletePatient
} from '../../controller/Admin/adminController.js';

const adminRouter = express.Router();

// User routes
adminRouter.get('/users', getAllUsers);
adminRouter.delete('/users/:userId', deleteUser);

// Appointment routes
adminRouter.get('/appointments', getAllAppointments);
adminRouter.delete('/appointments/:appointmentId', deleteAppointment);

// Billing routes
adminRouter.get('/bills', getAllBills);
adminRouter.delete('/bills/:billId', deleteBill);

// Doctor routes
adminRouter.get('/doctors', getAllDoctors);
adminRouter.put('/doctors/status', updateDoctorStatus);

// Patient routes
adminRouter.get('/patients', getAllPatients);
adminRouter.put('/patients/:id', updatePatient);
adminRouter.delete('/patients/:id', deletePatient);

export default adminRouter;