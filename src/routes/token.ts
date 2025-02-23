import { Router } from "express";
import { IUserPayload } from "../database/types";
import jwt from "jsonwebtoken";

const router = Router();

const REFRESH_KEY = process.env.REFRESH_KEY ?? "secret-refresh-key";
const ACCESS_KEY = process.env.SUPER_SECRET_KEY ?? "super-secret-key";

router.post("/refresh", (req, res) => {
    const { refresh } = req.body;
    if (!refresh) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const dec = jwt.verify(refresh, REFRESH_KEY) as IUserPayload;
        const newAT = jwt.sign({ id: dec.id }, ACCESS_KEY, { expiresIn: "7d" });

        res.status(201).json({ token: newAT });
    } catch (err) {
        return res.status(401).json({ msg: "Unauthorized. Invalid refresh token" });
    }
});

export const tokenRouter = router;
