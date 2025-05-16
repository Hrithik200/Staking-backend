import mongoose, { Schema, Document } from "mongoose";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";

interface ITransfer extends Document {
    from: string;
    to: string;
    id: number;
    numberOfNFT: number;
    txHash: string;
    status: TransactionStatus;
}
const TransferNFTSchema = new Schema<ITransfer>(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        id: { type: Number, required: true },
        numberOfNFT: { type: Number, required: true },
        txHash: { type: String, required: true },
        status: {
            type: Number,
            enum: TransactionStatus, // Enforce enum values  
            default: TransactionStatus.PENDING // Default to PENDING
        }
    },
    { timestamps: true },
);

export const TransferNFT = mongoose.model<ITransfer>("TransferNFT", TransferNFTSchema);