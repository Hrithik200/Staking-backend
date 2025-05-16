import { TransactionStatus } from '../../../../utils/TransactionStatusEnum';
import { Transfer } from "../../models/TokenContract/Transfer";
import logger from "../../../../utils/Logger";

export class TransferRepository {
    static async saveTransaction(from: string, to: string, amount: string, txHash: string) {
        const transaction = new Transfer({ from, to, amount, txHash ,status: TransactionStatus.PENDING});
        logger.info(`SaveTransaction------,${ [from,to,amount,txHash]}`)
        return await transaction.save();
    }
    static async updateTransactionStatus(txHash: string, status: TransactionStatus) {
        return  await Transfer.findOneAndUpdate(
            { txHash },
            { status },
            { new: true } // Return updated document
        );
   
    }
}