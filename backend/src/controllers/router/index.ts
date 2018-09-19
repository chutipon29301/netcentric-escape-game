import { Router } from "express";
import { body } from "express-validator/check";
import Player from "../../dataModel/player.model";
import { validateRequest } from "../util/validator";

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
    "/list",
    (_, res) => {
        Player.findAll().then((result) => res.status(200).send({ result })).catch((err) => res.status(500).send({ err }));
    },
);

router.post(
    "/register",
    body("nickname").isString(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    validateRequest,
    (req, res) => {
        res.sendStatus(200);
    },
);
