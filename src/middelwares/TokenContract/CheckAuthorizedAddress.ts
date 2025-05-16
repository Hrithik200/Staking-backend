import { Register } from '../../../../models/TokenContract/RegisterUser  Response, NextFunction } from "express";

// 🔐 Check if user is authorized
export const checkAuthorizedAddress  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { from } = req.body; // or from headers/query
        if (!from) {
            return res.status(400).json({ message: "Address is required" });
        }
        else {
            const exists:any = await Register.findOne({ address: from });
            if (!exists) {
                return res.status(403).json({ message: "Unauthorized address" });

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

