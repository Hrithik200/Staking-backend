import express from "express";
import { TransferControllerNFT } from "../../controllers/NFTContract/TransferControllerNFT";

const router = express.Router();

router.post(
    "/transfer-nft",
    TransferControllerNFT.transferNFT
);

export default router;