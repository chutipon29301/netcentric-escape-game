import { Router } from "express";
import { Timer } from "../GameRunner/timer";
import { GameMap } from "../GameRunner/maps";
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
router.get("/timer/:count",(req,res)=>{
    res.json({
        msg: Timer.startCountdown(req.params.count),
    })
})
router.get("/maping/:x/:y/:player",(req,res)=>{
    let game = new GameMap(+req.params.x,+req.params.y,+req.params.player);
    res.sendStatus(200);
})

router.get(
    "/list",
    (_, res) => {
        Player.findAll().then((result) => res.status(200).send({ result })).catch((err) => res.status(500).send({err}));
    },
);
