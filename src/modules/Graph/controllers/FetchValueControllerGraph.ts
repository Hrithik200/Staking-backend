// src/controllers/staking.controller.ts
import { Request, Response } from "express";
import { FetchValuesServiceGraph } from "../services/FetchValuesServiceGraph";

export class FetchValueControllerGraph20 {
  static async getApprovalsData(req: Request, res: Response) {
    await FetchValueControllerGraph20.handle(res, FetchValuesServiceGraph.getApprovals);
  }

  static async getTransfersData(req: Request, res: Response) {
    await FetchValueControllerGraph20.handle(res, FetchValuesServiceGraph.getTransfers);
  }

  static async getOwnershipTransferData(req: Request, res: Response) {
    await FetchValueControllerGraph20.handle(res, FetchValuesServiceGraph.getOwnershipTransfer);
  }

  private static async handle(res: Response,
    fn: () => Promise<any>
  ) {
    try {
      const data = await fn();
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ success: false, message: "Failed to fetch data" });
    }
  }
}
