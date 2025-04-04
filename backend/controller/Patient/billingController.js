import Billing from "../../models/Billing.js";
import Patient from "../../models/Patient.js";

// Enum values for validation
const STATUS_ENUM = ["Paid", "Pending"];




// ✅ Get Single Billing Record by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate("patient", "name email");
    if (!billing) return res.status(404).json({ message: "Billing record not found" });

    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching billing record", error });
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

// ✅ Delete Billing Record
export const deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling) return res.status(404).json({ message: "Billing record not found" });

    res.status(200).json({ message: "Billing record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting billing record", error });
  }
};