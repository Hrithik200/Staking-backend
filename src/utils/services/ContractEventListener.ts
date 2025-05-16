import { WebSocketProvider, Contract, Log } from "ethers";
import ERC20ABI from "../../blockchain/ERC20ABI.json";
import { ERC20Values } from "../CommonFunction";

const ALCHEMY_WS = "wss://eth-holesky.g.alchemy.com/v2/RD2zotxPkvNJCHVSy0dOSGwcad4gjvoO";

// Contract Values
const { contractAddress } = ERC20Values();
const CONTRACT_ADDRESS = contractAddress;

// Retry helper for transaction
const retryGetTransaction = async (
  provider: WebSocketProvider,
  txHash: string,
  maxRetries = 40,
  delay = 3000
): Promise<any | null> => {
  for (let i = 0; i < maxRetries; i++) {
    const tx = await provider.getTransaction(txHash);
    if (tx) return tx;
    await new Promise((res) => setTimeout(res, delay));
  }
  return null;
};

// Retry helper for receipt
const retryGetReceipt = async (
  provider: WebSocketProvider,
  txHash: string,
  maxRetries = 40,
  delay = 3000
): Promise<any | null> => {
  for (let i = 0; i < maxRetries; i++) {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (receipt) return receipt;
    await new Promise((res) => setTimeout(res, delay));
  }
  return null;
};

export const listenToContractEvents = async (): Promise<void> => {
  try {
    const provider = new WebSocketProvider(ALCHEMY_WS);
    const contract = new Contract(CONTRACT_ADDRESS, ERC20ABI, provider);

    // Listen for Transfer event
    contract.on("Transfer", async (from: string, to: string, value: number, event) => {
      console.log("📢 Transfer Event:");
      console.log(`From: ${from}`);
      console.log(`To: ${to}`);
      console.log(`Value: ${value}`);

      const log: Log = event.log;

      if (log.transactionHash) {
        console.log(`⏳ Waiting for transaction data for hash: ${log.transactionHash}`);
        const tx = await retryGetTransaction(provider, log.transactionHash);
        const receipt = await retryGetReceipt(provider, log.transactionHash);

        if (tx && receipt) {
          const block = await provider.getBlock(tx.blockNumber);
          console.log("✅ Tx Hash:", tx.hash);
          console.log("📦 Block Number:", tx.blockNumber);
          console.log("🧾 Nonce:", tx.nonce);
          console.log("📄 Data (calldata):", tx.data);
          console.log("📘 Transaction Type:", tx.type); // 0 = legacy, 2 = EIP-1559
          console.log("Transaction",tx)

          console.log("Transaction",tx.signature)
          console.log("Transaction",tx.signature.r)

          console.log("chainId",tx.chainId)
          console.log("Transaction",tx.provider);
          console.log("gasPrice",tx.gasPrice);
  
          // Transaction status
          if (receipt.status === 1) {
            console.log("🎉 Transaction succeeded");

          } else {
            console.log("❌ Transaction failed");
          }
        } else {
          console.log("❌ Failed to retrieve transaction or receipt within timeout.");
        }
      } else {
        console.log("🔴 No transaction hash found in event.log.");
      }

      // Optional: DB/queue logic here
    });

    // Listen for Approval event
    contract.on("Approval", async (owner: string, spender: string, value: number, event: Log) => {
      console.log("📢 Approval Event:");
      console.log(`Owner: ${owner}, Spender: ${spender}, Value: ${value}`);
      console.log("Tx Hash:", event.transactionHash);
      console.log("Block Number:", event.blockNumber);




    });

    // Listen for OwnershipTransferred event
    contract.on("OwnershipTransferred", async (previousOwner: string, newOwner: string, event: Log) => {
      console.log("📢 OwnershipTransferred Event:");
      console.log(`Previous Owner: ${previousOwner}, New Owner: ${newOwner}`);
      console.log("Tx Hash:", event.transactionHash);
      console.log("Block Number:", event.blockNumber);
    });

    // Handle WS reconnects
    const rawSocket = provider.websocket as unknown as WebSocket;
    rawSocket.onclose = () => {
      console.warn("🛑 WebSocket closed. Reconnecting...");
      setTimeout(listenToContractEvents, 5000);
    };

    rawSocket.onerror = (err) => {
      console.error("🔴 WebSocket error:", err);
    };

  } catch (err) {
    console.error("❌ Error in listener:", err);
  }
};
