import { IUserPayload } from "../database/types";
import jwt from "jsonwebtoken";
import { ACCESS_KEY, idsResevervedForAdmins, REFRESH_KEY } from "./constants";

export const genToken = (user: {
    id: number;
    fname: string;
    lname: string;
}): { token: string; refreshToken: string } => {
    const isAdmin = idsResevervedForAdmins.includes(user.id);

    const token = jwt.sign(
        {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            isAdmin: isAdmin
        } as IUserPayload,
        ACCESS_KEY,
        { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
        {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            isAdmin: isAdmin
        } as IUserPayload,
        REFRESH_KEY // no expiry for ref tkn
    );

    console.log("Generated JWT:", token);
    console.log("Generated Refresh:", refreshToken);

    return { token, refreshToken };
};
