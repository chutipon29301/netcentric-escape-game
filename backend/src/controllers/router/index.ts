import { Router } from "express";
import { body } from "express-validator/check";
import { Timer } from "../GameRunner/timer";
import { GameMap } from "../GameRunner/maps";
import Player from "../../dataModel/player.model";
import { JWTAuth } from "../../repositories/JWTAuth";
import { User } from "../../repositories/User";
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
        User.getInstance().addUser(
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
        User.getInstance().login(
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
