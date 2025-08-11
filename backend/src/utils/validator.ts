import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { createResponse } from "./apiResponse";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createResponse(400, "Validation failed", {
          errors: errors.array(),
        })
      );
  }
  next();
};
