import mongoose from "mongoose";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum"; // Import enum if using it

const ApproveSchema = new mongoose.Schema(
  {
    approvalFrom: { type: String, required: true },
    approvalTo: { type: String, required: true },
    amount: { type: String, required: true },
    txHash: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(TransactionStatus), // ["PENDING", "COMPLETED", "FAILED"]
      default: TransactionStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const Approve = mongoose.model("Approve", ApproveSchema);
