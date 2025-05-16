// src/controllers/staking.controller.ts
import { Request, Response } from "express";
import { FetchValueGraph } from "../services"

export class FetchValueControllerGraph {
  static async getStakingData(req: Request, res: Response) {
    try {
      const data = await FetchValueGraph.fetchApproveData();
      res.json({ success: true, data:data });
    } catch (error) {
      console.error("Error fetching staking data:", error);
      res.status(500).json({ success: false, message: "Failed to fetch staking data" });
    }
  }
}
