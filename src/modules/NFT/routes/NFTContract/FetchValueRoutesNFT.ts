import express from "express";
import { FetchValueControllerNFT } from "../../controllers/NFTContract";


const router = express.Router();

router.get(
    "/nft-data",
    FetchValueControllerNFT.nftData
);
router.get(
    "/roles",
    FetchValueControllerNFT.fetchRole
);
router.get(
    "/has-role",
    FetchValueControllerNFT.fetchHasRole
);

export default router;