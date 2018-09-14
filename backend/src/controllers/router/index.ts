import { Router } from "express";

export const router = Router();

router.get(
    "/ping",
    (_, res) => {
        res.json({
            msg: "pong",
        });
    },
);
