import { Web3, HttpProvider } from "web3";
import dotenv from "dotenv";

import logger from "../../../../utils/Logger";
dotenv.config();
import { TatumGasService } from "../TatumService";
import { TransferRepository } from "../../repositories/TokenContract/TransferRepository";
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";
import { ERC20Values } from "../../../../utils/CommonFunction";
import { ApproveRepository } from "../../repositories/TokenContract/ApproveRepository";


const { web3, contractAddress, contract } = ERC20Values();

export class TransferService {
    static async processTransfer(from: string, to: string, amount: string, keyOfUser: any) {
        logger.info("in the Service transaction ")

        const data = await contract.methods.transfer(to, amount).encodeABI();
        const gasPrice: any = await TatumGasService.recommendedGas();
        const gasLimit = await contract.methods.transfer(to, amount).estimateGas({ from });

        const tx = {
            from,
            to: contractAddress,
            data,
            gas: gasLimit,
            gasPrice,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, keyOfUser);

        await TransferRepository.saveTransaction(from, to, amount, signedTx.transactionHash);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        // Tx Successful- Save to DB
        await TransferRepository.updateTransactionStatus(signedTx.transactionHash, TransactionStatus.COMPLETED);
        logger.info(`Service Updated,${[tx, receipt.transactionHash]}`)
        return receipt.transactionHash;

    }
    static async processTransferFrom(from: string, to: string, amount: string, keyOfUser: string) {
        console.log([from,to,amount])
        const data = await contract.methods.transferFrom(from, to, amount).encodeABI();
        console.log("in the function ")
        const gasPrice: any = await TatumGasService.recommendedGas();
        const gasLimit = await contract.methods.transferFrom(from, to, amount).estimateGas({ from });

        const tx = {
            from,
            to: contractAddress,
            data,
            gas: gasLimit,
            gasPrice,
        };
        console.log("in the tx",tx);


        const signedTx = await web3.eth.accounts.signTransaction(tx, keyOfUser);
        await TransferRepository.saveTransaction(from, to, amount, signedTx.transactionHash);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
        await TransferRepository.updateTransactionStatus(signedTx.transactionHash, TransactionStatus.COMPLETED);

        logger.info(`Service Updated,${[tx, receipt.transactionHash]}`)
        return receipt.transactionHash;

    }
    static async processMint(from: string, to: string, amount: string, keyOfAdmin: string) {
        const data = await contract.methods.mint(to, amount).encodeABI();
        const gasPrice: any = await TatumGasService.recommendedGas();
        const gasLimit = await contract.methods.mint(to, amount).estimateGas({ from });

        const tx = {
            from: from,
            to,
            data,
            gas: gasLimit,
            gasPrice,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, keyOfAdmin);
        await TransferRepository.saveTransaction(from, to, amount, signedTx.transactionHash);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
        await TransferRepository.updateTransactionStatus(signedTx.transactionHash, TransactionStatus.COMPLETED);
        logger.info(`Service Updated,${[tx, receipt.transactionHash]}`)
        return receipt.transactionHash;

    }
    static async processApprove(from: string, to: string, amount: string, keyOfUser: any) {
        const data = await contract.methods.approve(to, amount).encodeABI();
        const gasPrice: any = await TatumGasService.recommendedGas();
        const gasLimit = await contract.methods.approve(to, amount).estimateGas({ from });
        const tx = {
            from,
            to,
            data,
            gas: gasLimit,
            gasPrice,
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, keyOfUser);
        await ApproveRepository.saveTransaction(from, to, amount, signedTx.transactionHash);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
        await ApproveRepository.updateTransactionStatus(signedTx.transactionHash, TransactionStatus.COMPLETED);
        logger.info(`Service Updated,${[tx, receipt.transactionHash]}`)
        return receipt.transactionHash;
    }
}




