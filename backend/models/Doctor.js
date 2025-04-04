import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  availability: [
    {
      day: { type: String, required: true }, // Example: "Monday"
      startTime: { type: String, required: true }, // Example: "09:00 AM"
      endTime: { type: String, required: true } // Example: "05:00 PM"
    }
  ],
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;