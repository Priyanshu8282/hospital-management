import Doctor from "../../models/Doctor.js";


// ✅ Create a New Doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, qualifications } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !specialization || !experience || !qualifications) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error });
  }
};



// ✅ Get Single Doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

// ✅ Update Doctor Details
export const updateDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialization, experience, qualifications } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !specialization || !experience || !qualifications) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
};

// ✅ Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};



