import Appointment from "../../models/Appointment.js";
import Patient from "../../models/Patient.js";
import Doctor from "../../models/Doctor.js";

// ✅ Create a New Appointment
export const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, status } = req.body;

    // Validate required fields
    if (!patient || !doctor || !date || !status) {
      return res.status(400).json({ message: "Patient, doctor, date, and status are required" });
    }

    // Check if patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if doctor exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: "Error creating appointment", error });
  }
};



// ✅ Get Single Appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("patient doctor", "name email");
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

// ✅ Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, status } = req.body;

    // Validate required fields
    if (!patient || !doctor || !date) {
      return res.status(400).json({ message: "Patient, doctor, and date are required" });
    }

    // Check if patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if doctor exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// ✅ Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};