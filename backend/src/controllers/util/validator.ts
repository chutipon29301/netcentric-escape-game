import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";

export function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (!validationResult(req).isEmpty()) {
        res.status(400).send({ error: validationResult(req).array() });
    } else {
        next();
    }
}
