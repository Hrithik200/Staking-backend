import { RegisterRepository } from "../../repositories/TokenContract/RegisterRepository";
import { Request, Response, NextFunction } from "express";
import { ErrorMap } from "../../../../utils/ErrorHandler";

export const RegisterController = {
    register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userType, address, key } = req.body;
            await RegisterRepository.saveTransaction(userType, address, key);
            res.json({
                success: true, 
                message: "New user added"
             });
        } catch (error: any) {
              const known = ErrorMap[error.message];
              const status = known?.status || error.statusCode || 500;
              const message = known?.message || error.message || "Something went wrong";
              res.status(status).json({ error: message });
            }
    }
};
