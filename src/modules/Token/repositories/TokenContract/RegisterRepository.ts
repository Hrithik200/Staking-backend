import { Register } from "../../models/TokenContract/RegisterUser";
import { IUserModel } from "../../models/TokenContract/RegisterUser"
export class RegisterRepository {
    static async saveTransaction(userType: string, address: string, privateKey: string) {
        const transaction = new Register({ userType, address, privateKey });
        return await transaction.save();
    }
    static async checkUserExist(address: string) {
        const user = await Register.findOne({ address });
        return user ? true : false;
    }
    static async keyUser(address: string): Promise<IUserModel | null> {
        const user = await Register.findOne({ address }, { privateKey: 1, _id: 0 });
        return user;
    }
    static async getUserTypeByAddress(address: string) {
        const user = await Register.findOne({ address }, { userType: 1, _id: 0 });
        return user as IUserModel
    }
    static async keyAdmin(address: string): Promise<IUserModel | null> {
        const user = await Register.findOne(
            { address, userType: 'admin' }, // Filter admin only
            { privateKey: 1, _id: 0 }       // Project only privateKey
        );
        return user;
    }
}