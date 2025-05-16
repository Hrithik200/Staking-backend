import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../../../../utils/Logger";

export const validate:any =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("In the Middlewares....");
      req.body = schema.parse(req.body); // validated + typed
      next();
    } catch (error: any) {
      if (error.name === "ZodError") {
        logger.info("error in validation from user end while passing values in JSON")
        return res.status(400).json({ error: error.errors[0].message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
