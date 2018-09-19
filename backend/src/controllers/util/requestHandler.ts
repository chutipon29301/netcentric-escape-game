import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { Subscriber } from "rxjs";
import { SubjectSubscriber } from "rxjs/internal/Subject";

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

export function completionHandler(
    res: Response,
): Subscriber<any> {
    return SubjectSubscriber.create(
        // tslint:disable-next-line:no-empty
        () => { },
        (error) => res.status(500).send({ error: error.toString() }),
        () => res.sendStatus(200),
    );
}

export function errorHandler(
    res: Response,
): (error: any) => void {
    return (error) => res.status(500).send({ error: error.toString() });
}
