import axios from "axios";
import dotenv from "dotenv";
import { throwMappedError } from "../../../utils/ErrorHandler";

dotenv.config();

const API_KEY = process.env.TATUM_API_KEY_TESTNET;

export class TatumGasService {
    static async recommendedGas() {
        const response = await axios.get("https://api.tatum.io/v3/blockchain/fee/ETH", {
            headers: {
                "accept": "application/json",

                "x-api-key": API_KEY as string
            }
        });
        const fastGas = response.data?.fast;

        if (!fastGas) throwMappedError("Gas Estimation Error!");
        return fastGas.toString();
    }
}
