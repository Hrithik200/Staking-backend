import express from "express"
import { TransferController } from '../../controllers/TokenContract';
import { validate } from "../../middelwares/TokenContract/Validate";
import { approveSchema, mintSchema, transferSchema } from "../../../../validators/TokenContract/TransferValidators";
import { checkAuthorizedAddress } from "../../middelwares/TokenContract/CheckAuthorizedAddress";
import { Request, Response, NextFunction, RequestHandler } from "express";

const router = express.Router();
router.use(checkAuthorizedAddress );

router.post(
    "/transfer",
    validate(transferSchema),
    TransferController.createTransfer 
);
router.post(
    "/transfer-from",
    validate(transferSchema),
    TransferController.createTransferFrom 
);
router.post(
    "/mint",
    validate(mintSchema),
    TransferController.createMint 
);
router.use(
    "/approve",
    validate(approveSchema),
    TransferController.createApprove
);

export default router;

