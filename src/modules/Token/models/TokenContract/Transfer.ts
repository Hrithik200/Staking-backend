import mongoose,{Schema, Document } from "mongoose";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";

interface ITransfer extends Document {
    from: string;
    to: string;
    amount: string;
    txHash: string;
    status: TransactionStatus;
}
const TransferSchema = new Schema<ITransfer>(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        amount: { type: String, required: true },
        txHash: { type: String, required: true },
        status: { 
            type: Number, 
            enum: TransactionStatus, // Enforce enum values  
            default: TransactionStatus.PENDING // Default to PENDING
        }
    },
    { timestamps: true },
);

export const Transfer = mongoose.model<ITransfer>("Transfer", TransferSchema);