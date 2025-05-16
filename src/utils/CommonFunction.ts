import { Web3, HttpProvider } from "web3";
import ERC20ABI from "../blockchain/ERC20ABI.json";
import ERC721ABI from "../blockchain/ERC721ABI.json";
import dotenv from "dotenv";
dotenv.config();

export const handleError = (error: any, functionName: string) => {
    console.error(`Error in ${functionName}:`, error);
    throw new Error(`Transaction failed in ${functionName}`);
};

const getWeb3Instance = () => {
    const URL = process.env.RPC_URL;
    if (!URL) {
        throw new Error("RPC_URL is not defined in the environment variables.");
    }
    return new Web3(new HttpProvider(URL));
};

const getContractInstance = (abi: any, contractAddress: string | undefined) => {
    if (!contractAddress) {
        throw new Error("Contract address is not defined in the environment variables.");
    }
    const web3 = getWeb3Instance();
    return {
        web3,
        contract: new web3.eth.Contract(abi, contractAddress),
        contractAddress
    };
};

export const ERC20Values = () => {
    return getContractInstance(ERC20ABI, process.env.CONTRACT_ADDRESS_20);
};

export const NFTValues = () => {
    return getContractInstance(ERC721ABI, process.env.CONTRACT_ADDRESS_1155);
};
