import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
    profilePicture: { type: String, trim: true },
    allergies: { type: [String], default: [] }, // List of allergies
    medicalHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" }, // Reference to MedicalRecord model
    ],
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    contactNumber: { type: String, trim: true }, // Patient's contact number
  
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;