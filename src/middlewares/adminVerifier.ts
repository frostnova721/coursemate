import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_KEY } from "../utils/constants";
import { IUserPayload } from "../database/types";

export const verifyAdmin = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        try {
            const decoded = jwt.verify(token, ACCESS_KEY) as IUserPayload;
            if (!decoded.isAdmin) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.body.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};
