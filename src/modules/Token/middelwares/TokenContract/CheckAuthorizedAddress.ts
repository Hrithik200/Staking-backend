import { Register } from '../../models/TokenContract/RegisterUser';
import { Request, Response, NextFunction, RequestHandler } from "express";

// 🔐 Check if user is authorized
export const checkAuthorizedAddress: RequestHandler  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { from } = req.body; // or from headers/query
        if (!from) {
             res.status(400).json({ message: "Address is required" });
             return;
        }
        else {
            const exists:any = await Register.findOne({ address: from });
            if (!exists) {
             res.status(403).json({ message: "Unauthorized address" });
             return;

            }
            next();
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// 🔐 Check if user is new (used in registration)
export const CheckNewUser  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { address } = req.body; // or from headers/query
        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        const exists = await Register.findOne({ address: address });

        if (exists) {
            return res.status(403).json({ message: "Address already exists" });
            }
        
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

