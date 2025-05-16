import dotenv from "dotenv";
dotenv.config();
import logger from "../../../../utils/Logger";


import { TatumGasService } from "../../../Token/services/TatumService";
import { NFTValues } from '../../../../utils/CommonFunction';
import { TransactionStatus } from "../../../../utils/TransactionStatusEnum";
import { TransferRepositoryNFT } from "../../repositories/NFTContract/TransferRepositoryNFT"


const { web3, contractAddress, contract } = NFTValues();

export class TransferServiceNFT {
    static async processTransferNFT(from: string, to: string, id: number, numberOfNFT: number, keyOfUser: any) {
        logger.info("in the TransferServiceNFT ", contractAddress, contract)
        console.log([numberOfNFT, contractAddress], "contractAddress");

        // ✅ Get latest nonce (from 'pending' pool also)
        const nonce = await web3.eth.getTransactionCount(from, 'pending');


        const data = await contract.methods.transferNFT(to, id, numberOfNFT).encodeABI();
        const gasPrice: any = await TatumGasService.recommendedGas();
        const gasLimit = await contract.methods.transferNFT(to, id, numberOfNFT).estimateGas({ from });

        const tx = {
            from,
            to: contractAddress,
            data,
            gas: gasLimit,
            gasPrice,
            nonce
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, keyOfUser);

        await TransferRepositoryNFT.saveTransaction(from, to, id, numberOfNFT, signedTx.transactionHash);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        // Tx Successful- Save to DB
        await TransferRepositoryNFT.updateTransactionStatus(signedTx.transactionHash, TransactionStatus.COMPLETED);
        logger.info(`Service Updated ,${[tx, receipt.transactionHash]}`)
        return receipt.transactionHash;

    }
}