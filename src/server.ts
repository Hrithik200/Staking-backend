import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import TransactionRoutes from "./modules/Token/routes/TokenContract/RegisterUserRoutes";
import FetchValueRoutes from "./modules/Token/routes/TokenContract/FetchValueRoutes";

import TransferRoutes from "./modules/Token/routes/TokenContract/TransferRoutes";
import './workers/Transaction.worker';

import  eventEmitter from "../src/utils/EventEmitter";
import logger from "../src/utils/Logger";
import { ErrorMap } from "./utils/ErrorHandler";
import TransferRoutesNFT from "./modules/NFT/routes/NFTContract/TransferRoutesNFT";
import FetchValueRoutesNFT from "./modules/NFT/routes/NFTContract/FetchValueRoutesNFT";
import { limiter } from "./middelwares/rateLimiter";
import FetchValueRoutesGraph from "./modules/Graph/routes/FetchValueRoutesGraph";
import { listenToContractEvents } from "./utils/services/ContractEventListener";
import {listenToPendingTransactions } from "./utils/services/ContractPendingListener";



dotenv.config();
const app = express();
app.use(limiter); 
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
connectDB()
app.use("/api/transactions", TransactionRoutes);  // Mount Transaction routes
app.use("/api/contract", FetchValueRoutes);    // Mount FetchValue routes
app.use("/api/blockchain",TransferRoutes);
app.use("/",TransferRoutesNFT);
app.use("/",FetchValueRoutesNFT);
app.use("/graph",FetchValueRoutesGraph);

listenToPendingTransactions()

listenToContractEvents()
  .then(() => {
    console.log("✅ Listening to contract events...");
  })
  .catch((err) => {
    console.error("❌ Error starting listener:", err);
  });
  


// Create EventEmitter instance

// eventEmitter.on('mintCreated', (from: string, to: string, amount: number, txHash: string) => {
//     console.log(`Mint event triggered:`);
//     console.log(`From: ${from}`);
//     console.log(`To: ${to}`);
//     console.log(`Amount: ${amount}`);
//     console.log(`Transaction Hash: ${txHash}`);
// })
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal server error' });
  });
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const known = ErrorMap[err.message];
    const status = known?.status || err.statusCode || 500;
    const message = known?.message || err.message || "Something went wrong";

    res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`✅Server running on port ${PORT}`));


