import { Approve } from "../../models/TokenContract/Approve";
import logger from "../../../../utils/Logger";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";

export class ApproveRepository {
  static async saveTransaction(from: string, to: string, amount: string, txHash: string) {
    const transaction = new Approve({
      approvalFrom: from,
      approvalTo: to,
      amount,
      txHash,
      status: TransactionStatus.PENDING,
    });
    logger.info(`ApproveRepository: Save tx: ${[from, to, amount, txHash]}`);
    return await transaction.save();
  }

  static async updateTransactionStatus(txHash: string, status: TransactionStatus) {
    const transaction = await Approve.findOneAndUpdate(
      { txHash },
      { status },
      { new: true }
    );
    logger.info(`ApproveRepository: Updated status of ${txHash} -> ${status}`);
    return transaction;
  }
}
