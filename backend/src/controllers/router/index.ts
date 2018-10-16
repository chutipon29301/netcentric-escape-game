import { Router } from "express";
import { body } from "express-validator/check";
import { JWTAuth } from "../../repositories/JWTAuth";
import { User } from "../../repositories/User";
import { completionHandler, errorHandler, validateRequest } from "../util/requestHandler";
import { router as debug } from "./debug";

export const router = Router();

router.use("/debug", debug);

router.get(
    "/ping",
    (_, res) => {
        res.json({
            msg: "pong",
        });
    },
);

router.post(
    "/register",
    body("nickname").isString(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    validateRequest,
    (req, res) => {
        User.addUser(
            req.body.nickname,
            req.body.email,
            req.body.password,
        ).subscribe(completionHandler(res));
    },
);

router.post(
    "/token",
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    validateRequest,
    (req, res) => {
        User.login(
            req.body.email,
            req.body.password,
        ).subscribe(
            (token) => res.status(200).send(token),
            errorHandler(res),
        );
    },
);

router.post(
    "/refreshToken",
    body("refreshToken").isString(),
    validateRequest,
    (req, res) => {
        try {
            const token = JWTAuth.getTokenFromRefreshToken(req.body.refreshToken);
            res.status(200).send(token);
        } catch (error) {
            res.status(401).send(error);
        }
    },
);
