import Patient from "../../models/Patient.js";
import User from "../../models/AuthModel.js";
import Doctor from "../../models/Doctor.js";


// Enum values for validation
const GENDER_ENUM = ["Male", "Female", "Other"];
const BLOOD_GROUP_ENUM = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];


export const createOrUpdatePatient = async (req, res) => {
  try {
    const { user, age, gender, bloodGroup, allergies, address, contactNumber } = req.body;
    const profileImage = req.file ? req.file.path : null; // Get the uploaded file path

    // Validate required fields
    if (!user || !age || !gender) {
      return res.status(400).json({ message: "User, age, and gender are required" });
    }

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate enum fields
    if (!GENDER_ENUM.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }
    if (bloodGroup && !BLOOD_GROUP_ENUM.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group value" });
    }

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ user }).populate('user', 'firstName lastName email mobile_no');

    if (existingPatient) {
      // Update existing patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        existingPatient._id,
        { age, gender, bloodGroup, profilePicture: profileImage, allergies, address, contactNumber },
        { new: true }
      ); // Populate user info

      return res.status(200).json({
        message: "Patient updated successfully",
        updatedPatient,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          mobile_no: existingUser.mobile_no,
        },
      });
    } else {
      // Create new patient
      const newPatient = new Patient({
        user,
        age,
        gender,
        bloodGroup,
        profilePicture: profileImage,
        allergies,
        address,
        contactNumber,
      });

      await newPatient.save();

      // Populate user info for the response
     

      return res.status(201).json({
        message: "Patient created successfully",
        newPatient,
    
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          mobile_no: existingUser.mobile_no,
        },
      });
    }
  } catch (error) {
    console.error("Error processing patient data:", error);
    res.status(500).json({ message: "Error processing patient data", error });
  }
};
// ✅ Get Single Patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user").populate("medicalHistory");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// ✅ Update Patient Details
export const updatePatient = async (req, res) => {
  try {
    const { age, gender, bloodGroup, allergies, address, contactNumber } = req.body;

    // Validate enum fields
    if (gender && !GENDER_ENUM.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }
    if (bloodGroup && !BLOOD_GROUP_ENUM.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group value" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { age, gender, bloodGroup, allergies, address, contactNumber },
      { new: true }
    );
    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// ✅ Get Patient Medical History
export const getMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("medicalHistory");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient.medicalHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medical history", error });
  }
};

// ✅ Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// ✅ Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};