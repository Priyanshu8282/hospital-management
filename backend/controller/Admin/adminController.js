import User from '../../models/AuthModel.js';
import Doctor from '../../models/Doctor.js';
import Appointment from '../../models/Appointment.js';
import Billing from '../../models/Billing.js';
import Patient from '../../models/Patient.js';

const STATUS_ENUM = ["Paid", "Pending"];

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient doctor", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBilling = async (req, res) => {
  try {
    const { patient, amount, status } = req.body;

    // Validate required fields
    if (!patient || !amount) {
      return res.status(400).json({ message: "Patient and amount are required" });
    }

    // Check if patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validate enum fields
    if (status && !STATUS_ENUM.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const newBilling = new Billing({ patient, amount, status });
    await newBilling.save();
    res.status(201).json({ message: "Billing record created successfully", billing: newBilling });
  } catch (error) {
    res.status(500).json({ message: "Error creating billing record", error });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await Billing.find().populate("patient", "name email");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Billing Record
export const updateBilling = async (req, res) => {
  try {
    const { patient, amount, status } = req.body;

    // Validate required fields
    if (!patient || !amount) {
      return res.status(400).json({ message: "Patient and amount are required" });
    }

    // Check if patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validate enum fields
    if (status && !STATUS_ENUM.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBilling = await Billing.findByIdAndUpdate(req.params.id, { patient, amount, status }, { new: true });
    if (!updatedBilling) return res.status(404).json({ message: "Billing record not found" });

    res.status(200).json({ message: "Billing record updated successfully", billing: updatedBilling });
  } catch (error) {
    res.status(500).json({ message: "Error updating billing record", error });
  }
};

export const deleteBill = async (req, res) => {
  const { billId } = req.params;

  try {
    const bill = await Billing.findById(billId);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    await Billing.findByIdAndDelete(billId);
    res.status(200).json({ message: "Billing record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// 🔹 Approve or Reject a Doctor
export const updateDoctorStatus = async (req, res) => {
  const { doctorId, status } = req.body; // Status: "Approved" or "Rejected"

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.status = status;
    await doctor.save();

    res.status(200).json({ message: `Doctor ${status} successfully` });
  } catch (error) {
    console.error('Error updating doctor status:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// ✅ Update Patient
export const updatePatient = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// ✅ Delete Patient
export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await Patient.findByIdAndDelete(patientId);
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};