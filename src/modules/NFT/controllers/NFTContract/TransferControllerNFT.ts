import { Request, Response, } from "express";

import { NFTValues } from "../../../../utils/CommonFunction";
import { RegisterRepository } from "../../../Token/repositories/TokenContract/RegisterRepository";
import { ErrorMap } from "../../../../utils/ErrorHandler";
import { FetchValueServiceNFT } from "../../services/NFTContract/FetchValueServiceNFT";
import { addProcessTransferNFTToQueue } from "../../../../queues/TransactionQueue";



export class TransferControllerNFT {
    static async transferNFT(req: Request, res: Response) {
        try {
            const { from,to, id, numberOfNFT } = req.body;
            console.info([from,to,id,numberOfNFT],"transferNFT json values");
            const key = await RegisterRepository.keyUser(from);
            console.log("🚀 ~ TransferNFTController ~ transferNFT ~ key :", key);
            if (!key?.privateKey) {
                throw new Error("Private key not found for this user");
            }
            //    Optional: check balance before queuing
            await FetchValueServiceNFT.userBalanceNFT(from, id, numberOfNFT);
            // 🔥 Push to queue
             await addProcessTransferNFTToQueue({ from,to, id, numberOfNFT, privateKey: key?.privateKey });

            res.status(202).json({ success: true, message: 'Transaction queued' });
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";

            res.status(status).json({ error: message });
        }

    }
} 