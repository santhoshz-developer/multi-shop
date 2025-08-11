import { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/apiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    return res
      .status(400)
      .json(createResponse(400, "Validation error", { errors: messages }));
  }

  if (err.name === "CastError") {
    return res.status(400).json(createResponse(400, "Invalid ID format", null));
  }

  res.status(500).json(createResponse(500, "Server error", null));
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(createResponse(404, "Route not found", null));
};
