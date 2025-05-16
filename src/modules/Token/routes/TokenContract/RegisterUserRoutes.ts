import { RegisterController } from '../../../../modules/Token/controllers/TokenContract';
import  express  from "express";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validate } from "../../middelwares/TokenContract/Validate";
import { RegisterSchema } from '../../../../validators/TokenContract/TransferValidators';
import { CheckNewUser } from '../../middelwares/TokenContract/CheckAuthorizedAddress';

const router = express.Router();
router.use(CheckNewUser as RequestHandler);
router.post("/register-user",validate(RegisterSchema) ,RegisterController.register as RequestHandler);
export default router;