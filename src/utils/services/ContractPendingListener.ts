import { WebSocketProvider, Interface, TransactionResponse } from "ethers";
import ERC20ABI from "../../blockchain/ERC20ABI.json";
import { ERC20Values } from "../CommonFunction";

const ALCHEMY_WS = "wss://eth-holesky.g.alchemy.com/v2/RD2zotxPkvNJCHVSy0dOSGwcad4gjvoO";

// Contract Values
const { contractAddress } = ERC20Values();
const CONTRACT_ADDRESS = contractAddress.toLowerCase();

const provider = new WebSocketProvider(ALCHEMY_WS);
const iface = new Interface(ERC20ABI);

const handlePendingTx = async (txHash: string): Promise<void> => {
  try {
    const tx: TransactionResponse | null = await provider.getTransaction(txHash);
    if (!tx) return; // Transaction data not yet available

    if (tx.to && tx.to.toLowerCase() === CONTRACT_ADDRESS) {
      console.log("🚨 Pending tx to your contract detected:");
      console.log(`Tx Hash: ${txHash}`);
      console.log(`From: ${tx.from}`);
      console.log(`To: ${tx.to}`);
      console.log(`Value: ${tx.value.toString()}`);
      console.log(`Gas Price: ${tx.gasPrice?.toString()}`);
      console.log(`Nonce: ${tx.nonce}`);

      try {
        const decoded :any= iface.parseTransaction({ data: tx.data, value: tx.value });
        console.log(`Function called: ${decoded.name}`);
        console.log("Arguments:", decoded.args);
      } catch (decodeErr) {
        console.warn("⚠️ Unable to decode calldata:", decodeErr);
      }
    }
  } catch (err) {
    console.error("Error fetching pending tx details:", err);
  }
};

export const listenToPendingTransactions = (): void => {
  provider.on("pending", handlePendingTx);
  console.log("👂 Listening to pending transactions targeting your contract...");
};
