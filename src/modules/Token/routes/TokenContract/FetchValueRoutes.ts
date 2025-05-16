import express from "express";

import {FetchValueController  }from "../../controllers/TokenContract/FetchValueController";


const router = express.Router();

router.get(
    "/total-supply",
    FetchValueController.totalSupply
);
router.get
    ("/name",
        FetchValueController.contractName
    );
router.get(
    "/owner",
    FetchValueController.contractOwner
);

export default router;