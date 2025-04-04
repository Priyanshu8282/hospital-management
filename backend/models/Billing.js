import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;
