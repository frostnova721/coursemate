import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../database/types";
import { ACCESS_KEY } from "../utils/constants";

interface AuthRequest extends Request {
    user?: IUserPayload;
}

// middle ware func to verify the token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const dec = jwt.verify(token, ACCESS_KEY) as AuthRequest["user"];
        req.body.user = dec;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export { verifyToken };
