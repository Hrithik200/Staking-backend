import dotenv from "dotenv";
import { ERC20Values } from "../../../../utils/CommonFunction";
import { throwMappedError } from "../../../../utils/ErrorHandler";

dotenv.config();

const { contract } = ERC20Values();



export class FetchValueService {
    static async totalSupply(): Promise<string> {
        const supply: bigint = await contract.methods.totalSupply().call();
        if (supply === null) {
            throwMappedError("Not able to fetch supply of the contract!.");
        }
        return supply.toString();
    }
    static async contractName(): Promise<string> {
        const name: string = await contract.methods.name().call();
        if (name === null) {
            throwMappedError("Not able to fetch name of the contract!.");
        }
        return name
    }
    static async contractOwner(): Promise<string> {
        const owner: string = await contract.methods.owner().call();

        if (owner === null) {
            throwMappedError("Not able to fetch owner of the contract!.");
        }
        return owner;
    }
    static async contractUserBalance(address: string, amount: number) {
            const balanceOfUser: number = await contract.methods.balanceOf(address).call();

            if (balanceOfUser < BigInt(amount) * BigInt(10 ** 18)) {
                throwMappedError("Not Enough User Balance Of Token!");
            }
            return { balanceOfUser: balanceOfUser };
        }
}

