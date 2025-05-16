import mongoose from "mongoose";
export interface IUserModel{
    userType:string,
    address?:string,
    privateKey?:string,
}
const RegisterUser = new mongoose.Schema(
    {
        userType:{type:String,required:true},
        address: { type: String, required: true },
        privateKey: { type: String, required: true },

    },
    { timestamps: true },
);


export const Register = mongoose.model("Register", RegisterUser);