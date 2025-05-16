import dotenv from "dotenv";
import { NFTValues } from "../../../../utils/CommonFunction";
import { throwMappedError } from "../../../../utils/ErrorHandler";

dotenv.config();

const { web3,contractAddress,contract } = NFTValues();


export class FetchValueServiceNFT {
    static async getNFTDetails(): Promise<Record<string, any>> {
        const methodsToCall = [
            { key: 'name', method: () => contract.methods.name().call() },
            { key: 'owner', method: () => contract.methods.admin().call() },
            { key: 'symbol', method: () => contract.methods.symbol().call() },
            { key: 'MAX_GOLD', method: () => contract.methods.MAX_GOLD().call() },
            { key: 'MAX_SILVER', method: () => contract.methods.MAX_SILVER().call() },
            { key: 'MAX_BRONZE', method: () => contract.methods.MAX_BRONZE().call() },
            { key: 'paused', method: () => contract.methods.paused().call() },
        ];

        const results = await Promise.allSettled(
            methodsToCall.map(item => item.method())
        );

        const details: Record<string, any> = {};

        results.forEach((res, index) => {
            const { key } = methodsToCall[index];
            if (res.status === 'fulfilled') {
                let value:any = res.value;
                if (typeof value === 'bigint') {
                    value = value.toString(); // 👈 Convert BigInt to string
                }
                details[key] = value;
            } else {
                const errMsg = `Failed to fetch ${key}: ${res.reason?.message || 'Unknown error'}`;
                details[key] = null;
                console.error(errMsg);
            }
        });

        const requiredKeys = ['name', 'owner'];
        for (const key of requiredKeys) {
            if (!details[key]) {
                throwMappedError(`Missing required data: ${key}`);
            }
        }

        return details;
    }

    static async userBalanceNFT(address: string, id: number, numberOfNFT: number) {
        const balanceOfUser: number = await contract.methods.balanceOf(address, id).call();

        if (balanceOfUser < numberOfNFT) {
            throwMappedError("Not Enough User Balance Of Token!");
        }
        return { balanceOfUser };
    }
    static getRoles(): { defaultAdminRole: string, minterRole: string, pauserRole: string } {
        const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";  // Default value for the admin role
        const MINTER_ROLE = web3.utils.keccak256("MINTER_ROLE");
        const PAUSER_ROLE = web3.utils.keccak256("PAUSER_ROLE");

        return {
            defaultAdminRole: DEFAULT_ADMIN_ROLE,
            minterRole: MINTER_ROLE,
            pauserRole: PAUSER_ROLE
        };
    }
    static async getHasRole(checkAddress: string): Promise<{
        defaultAdminRole: boolean,
        minterRole: boolean,
        pauserRole: boolean
    }> {
        const roles = this.getRoles(); // reuse static hashes

        const defaultAdminRole = !!(await contract.methods.hasRole(roles.defaultAdminRole, checkAddress).call());
        const minterRole = await contract.methods.hasRole(roles.minterRole, checkAddress).call();
        const pauserRole = await contract.methods.hasRole(roles.pauserRole, checkAddress).call();

        return {
            defaultAdminRole: !!defaultAdminRole,
            minterRole: !!minterRole,
            pauserRole: !!pauserRole
        };
    }
    }      

