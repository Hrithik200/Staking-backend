import { Worker } from 'bullmq';
import { redisConnection } from '../utils/Redis';
import { TransferService } from '../modules/Token/services/TokenContract';
import logger from '../utils/Logger';
import { TransferRepository } from '../modules/Token/repositories/TokenContract/TransferRepository';
import { TransactionStatus } from '../utils/TransactionStatusEnum';
import { TransferServiceNFT } from '../modules/NFT/services/NFTContract/TransferServiceNFT';

export const transactionWorker = new Worker(
  'processTransferQueue',
  async (job) => {
    const { from, to, amount, privateKey } = job.data;
    try {
      logger.info("in the worker's transaction ")

      const txHash = await TransferService.processTransfer(from, to, amount, privateKey);
      logger.info(`${job.id} Job Id in the Worker`)
      logger.info(`Transaction completed: https://holesky.etherscan.io/tx/${txHash}`);
    } catch (err: any) {
      logger.error(`Transaction failed: ${err.message}`);
    
      await TransferRepository.updateTransactionStatus(job.data.txHash!, TransactionStatus.FAILED);
    }
  },
  { connection: redisConnection }
);
export const transactionWorker2 = new Worker(
  'processTransferFromQueue',
  async (job) => {
    const { from, to, amount, privateKey } = job.data;
    try {
      logger.info("in the Worker transaction ")
      logger.info([from, to, amount, privateKey ]);
      const txHash = await TransferService.processTransferFrom(from, to, amount, privateKey);
      logger.info(`${job.id} Job Id in the Worker`)
      logger.info(`Transaction completed: ${txHash}`);
    } catch (err: any) {
      logger.error(`Transaction failed: ${err.message}`);
    
      await TransferRepository.updateTransactionStatus(job.data.txHash!, TransactionStatus.FAILED);
    }
  },
  { connection: redisConnection }
);
export const transactionWorker3 = new Worker(
  'processMintQueue',
  async (job) => {
    const { from, to, amount, privateKey } = job.data;
    try {
      logger.info("in the Worker transaction ")
      logger.info([from, to, amount, privateKey ]);
      const txHash = await TransferService.processMint(from, to, amount, privateKey);
      logger.info(`${job.id} Job Id in the Worker`)
      logger.info(`Transaction completed: https://holesky.etherscan.io/tx/${txHash}`);
    } catch (err: any) {
      logger.error(`Transaction failed: ${err.message}`);
    
      await TransferRepository.updateTransactionStatus(job.data.txHash!, TransactionStatus.FAILED);
    }
  },
  { connection: redisConnection }
);
export const transactionWorker4 = new Worker(
  'processTransferNFTQueue',
  async (job) => {
    const { from, to, id,numberOfNFT, privateKey } = job.data;
    try {
      logger.info("in the Worker transaction ")
      logger.info([from, to, id,numberOfNFT, privateKey ]);
      const txHash = await TransferServiceNFT.processTransferNFT(from, to, id,numberOfNFT,privateKey);
      logger.info(`${job.id} Job Id in the Worker`)
      logger.info(`Transaction completed: https://holesky.etherscan.io/tx/${txHash}`);
    } catch (err: any) {
      logger.error(`Transaction failed: ${err.message}`);
    
      await TransferRepository.updateTransactionStatus(job.data.txHash!, TransactionStatus.FAILED);
    }
  },
  { connection: redisConnection,
    concurrency: 50,
    }
);
