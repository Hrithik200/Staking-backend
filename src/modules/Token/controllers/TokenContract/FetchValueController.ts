import Web3 from "web3";
const web3 = new Web3();

import { Request, Response } from "express";
import { FetchValueService } from "../../services/TokenContract/FetchValueService";
import { ErrorMap } from "../../../../utils/ErrorHandler";


export  class FetchValueController {
  static async totalSupply(req: Request, res: Response) {
    try {
      const totalSupplyValue = await FetchValueService.totalSupply();
   
      res.json({
        success: true,
        totalSupply: totalSupplyValue
      });
    } catch (error: any) {
      const known = ErrorMap[error.message];
      const status = known?.status || error.statusCode || 500;
      const message = known?.message || error.message || "Something went wrong";
      res.status(status).json({ error: message });
    }
  }
  static async contractName(req: Request, res: Response) {
    try {
      const contractName = await FetchValueService.contractName();
  
      res.json({
        success: true,
        name: contractName
      });
    } catch (error: any) {
      const known = ErrorMap[error.message];
      const status = known?.status || error.statusCode || 500;
      const message = known?.message || error.message || "Something went wrong";
      res.status(status).json({ error: message });
    }
  }
  static async contractOwner(req: Request, res: Response) {
    try {
      const contractOwner = await FetchValueService.contractOwner();

      res.json({
        success: true,
        address: contractOwner
      });
    } catch (error: any) {
      const known = ErrorMap[error.message];
      const status = known?.status || error.statusCode || 500;
      const message = known?.message || error.message || "Something went wrong";
      res.status(status).json({ error: message });
    }
  }

}
