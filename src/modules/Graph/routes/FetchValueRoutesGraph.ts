import express from "express";
import { FetchValueControllerGraph20 } from "../controllers/FetchValueControllerGraph";


const router = express.Router();

router.get(
    "/approvals",
    FetchValueControllerGraph20.getApprovalsData
);
router.get(
    "/transfers",
    FetchValueControllerGraph20.getTransfersData
);
router.get(
    "/ownership-transfer",
    FetchValueControllerGraph20.getOwnershipTransferData
)

export default router;