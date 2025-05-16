import express from "express";
import { FetchValueControllerGraph } from "../controllers/FetchValueControllerGraph";


const router = express.Router();

router.get(
    "/graph-data",
    FetchValueControllerGraph.getStakingData
);


export default router;