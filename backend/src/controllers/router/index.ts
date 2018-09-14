import { Router } from "express";
import Player from "../../dataModel/player.model";

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
        Player.findAll().then((result) => res.status(200).send({ result })).catch((err) => res.status(500).send({err}));
    },
);
