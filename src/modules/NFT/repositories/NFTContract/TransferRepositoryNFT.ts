import { TransactionStatus } from '../../../../utils/TransactionStatusEnum';
import { TransferNFT } from "../../models/NFTContract";
import logger from "../../../../utils/Logger";

export class TransferRepositoryNFT {
    static async saveTransaction(from: string, to: string, id: number,numberOfNFT:number ,txHash: string) {
        const transaction = new TransferNFT({ from, to, id, numberOfNFT,txHash ,status: TransactionStatus.PENDING});
        logger.info(`SaveTransaction------,${ [from,to,id,txHash]}`)
        return await transaction.save();
    }
    static async updateTransactionStatus(txHash: string, status: TransactionStatus) {
        return  await TransferNFT.findOneAndUpdate(
            { txHash },
            { status },
            { new: true } // Return updated document
        );
   
    }
}