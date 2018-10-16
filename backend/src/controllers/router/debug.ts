import { Router } from "express";

export const router = Router();

router.get(
    "/",
    (_, res) => {
        res.render("template");
    },
);

router.get(
    "/register",
    (_, res) => {
        res.render("")
    }
)