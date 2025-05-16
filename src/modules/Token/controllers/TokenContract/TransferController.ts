import { Request,  Response } from "express";
import { TransferRepository } from "../../repositories/TokenContract/TransferRepository";
import { TransferService } from "../../services/TokenContract/TransferService"
import { ApproveRepository } from "../../repositories/TokenContract/ApproveRepository"
import eventEmitter from "../../../../utils/EventEmitter";

import logger from "../../../../utils/Logger";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";
import { FetchValueService } from "../../services/TokenContract/FetchValueService";
import { RegisterRepository } from "../../repositories/TokenContract/RegisterRepository";
import { ErrorMap, throwMappedError } from "../../../../utils/ErrorHandler";
import { ERC20Values } from "../../../../utils/CommonFunction";
import { addProcessTransferToQueue,addProcessTransferFromToQueue, addProcessMintToQueue } from "../../../../queues/TransactionQueue";

const { web3 } = ERC20Values();

export class TransferController {
    // static async createTransfer(req: Request, res: Response) {
    //     let txHashString: string | null = null;
    //     try {
    //         const { from, to, amount } = req.body;
    //         const key: any = await RegisterRepository.keyUser(from);
    //         await FetchValueService.contractUserBalance(from, amount);
    //         const txHash: any = await TransferService.processTransfer(from, to, amount, key?.privateKey);
    //         txHashString = web3.utils.bytesToHex(txHash);
    //         res.json({ success: true, txHash: txHashString });
    //     } catch (error: any) {
    //         if (txHashString) {
    //             await TransferRepository.updateTransactionStatus(txHashString, TransactionStatus.FAILED);
    //         }
    //         const known = ErrorMap[error.message];
    //         const status = known?.status || error.statusCode || 500;
    //         const message = known?.message || error.message || "Something went wrong";
    //         res.status(status).json({ error: message });
    //     }
    // }
    static async createTransfer(req: Request, res: Response) {
        try {
            const { from, to, amount } = req.body;
            const key = await RegisterRepository.keyUser(from);
            console.log("🚀 ~ TransferController ~ createTransfer ~ key:", key)
            if (!key?.privateKey) {
                throw new Error("Private key not found for this user");
            }
            // Optional: check balance before queuing
            await FetchValueService.contractUserBalance(from, amount);

            // 🔥 Push to queue
            await addProcessTransferToQueue({ from, to, amount, privateKey: key?.privateKey });

            res.status(202).json({ success: true, message: 'Transaction queued' });
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            
            res.status(status).json({ error: message });
        }
    }

    static async createTransferFrom(req: Request, res: Response) {
        let txHashString: string | null = null;
        try {
            const { from, to, amount } = req.body;
            await FetchValueService.contractUserBalance(from, amount);
            const key: any = await RegisterRepository.keyUser(from);
              // 🔥 Push to queue
     
              await addProcessTransferFromToQueue({ from, to, amount, privateKey: key?.privateKey });

              res.status(202).json({ success: true, message: 'Transaction queued' });
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            
            res.status(status).json({ error: message });
        }
    }

    static async createMint(req: Request, res: Response) {
        let txHashString: string | null = null;
        try {
            const { from, to, amount } = req.body;
            const key: any = await RegisterRepository.keyAdmin(from);
            // 🔥 Push to queue

            await addProcessMintToQueue({ from, to, amount, privateKey: key?.privateKey })
            res.status(202).json({ success: true, message: 'Transaction queued' });
        } catch (error: any) {
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            
            res.status(status).json({ error: message });
        }
    }
    
    static async createApprove(req: Request, res: Response) {
        let txHashString: string | null = null;
        try {
            const { from, to,amount } = req.body;
            const key: any = await RegisterRepository.keyUser(from);
          
            console.log(key?.privateKey,"key");
            const txHash = await TransferService.processApprove(from, to, amount, key?.privateKey);
            console.log(key?.privateKey),"Private key";

            txHashString = web3.utils.bytesToHex(txHash);

            res.json({ success: true, txHashString });
        } catch (error: any) {
            if (txHashString) {
                await ApproveRepository.updateTransactionStatus(txHashString, TransactionStatus.FAILED);
            }
            const known = ErrorMap[error.message];
            const status = known?.status || error.statusCode || 500;
            const message = known?.message || error.message || "Something went wrong";
            res.status(status).json({ error: message });
        }
    }
};





