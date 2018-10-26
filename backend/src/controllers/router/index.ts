import { Router } from "express";
import { body, param } from "express-validator/check";
import { JWTAuth } from "../../repositories/JWTAuth";
import { User } from "../../repositories/User";
import { WaitingRoomSocket } from "../socket/waitingRoom";
import { completionHandler, errorHandler, validateRequest } from "../util/requestHandler";

export const router = Router();

router.get(
    "/ping",
    (_, res) => {
        res.json({
            msg: "pong",
        });
    },
);

router.get(
    "/listUser",
    (_, res) => {
        User.list().subscribe(
            (player) => res.status(200).send({ player }),
            errorHandler(res),
        );
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

router.delete(
    "/user",
    body("email").isEmail(),
    validateRequest,
    (req, res) => {
        User.deleteUser(req.body.email).subscribe(completionHandler(res));
    },
);

router.delete(
    "/waitingList/:token",
    param("token").isString(),
    validateRequest,
    (req, res) => {
        WaitingRoomSocket.getInstance().removePlayerWithToken(req.params.token);
        res.sendStatus(200);
    },
);
