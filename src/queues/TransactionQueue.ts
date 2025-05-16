import { Queue, JobsOptions } from 'bullmq';

import { redisConnection } from '../utils/Redis';

// Job payload type
interface TransactionJobData {
  from: string;
  to: string;
  amount: string;
  privateKey: string;
  txHash?: string; // Optional for status updates
}
// Job payload type
interface TransactionJobDataNFT {
  from: string;
  to: string;
  id:number;
  numberOfNFT: number;
  privateKey: string;
  txHash?: string; // Optional for status updates
}

// Common job options
const defaultJobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 3000,
  },
  removeOnComplete: true,
  removeOnFail: false,
};

// Queues
export const processTransferQueue = new Queue<TransactionJobData>('processTransferQueue', {
  connection: redisConnection,
  defaultJobOptions,
});

export const processTransferFromQueue = new Queue<TransactionJobData>('processTransferFromQueue', {
  connection: redisConnection,
  defaultJobOptions,
});

export const processMintQueue = new Queue<TransactionJobData>('processMintQueue', {
  connection: redisConnection,
  defaultJobOptions,
});


export const processTransferNFTQueue = new Queue<TransactionJobDataNFT>('processTransferNFTQueue', {
  connection: redisConnection,
  
});

// Exported job-adders (match import names)
export const addProcessTransferToQueue = async (data: TransactionJobData) => {
  await processTransferQueue.add('transferJob', data);
};

export const addProcessTransferFromToQueue = async (data: TransactionJobData) => {
  await processTransferFromQueue.add('transferFromJob', data);
};

export const addProcessMintToQueue = async (data: TransactionJobData) => {
  await processMintQueue.add('mintJob', data);
};

export const addProcessTransferNFTToQueue = async (data: TransactionJobDataNFT) => {
  await processTransferNFTQueue.add('nftTransferJob', data);
};
