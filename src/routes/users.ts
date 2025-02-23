import { Router } from "express";
import { IUser, IUserPayload } from "../database/types";
import Database from "../database/database";
import { genToken } from "../utils/genToken";
import { verifyToken } from "../middlewares/tokenVerifier";
import { verifyAdmin } from "../middlewares/adminVerifier";
import { idsResevervedForAdmins } from "../utils/constants";

const router = Router();

const db = new Database();

// No verification for this
router.post("/users", async (req, res) => {
    const user: { id: number; fname: string; lname: string } = req.body;

    if (!user.fname) return res.status(400).json({ msg: "fname is not provided!" });
    if (!user.lname) return res.status(400).json({ msg: "lname is not provided!" });
    if (!user.id) return res.status(400).json({ msg: "id is not provided!" });

    const uc = await db.user.createUser({
        ...user,
        courses: [],
        isAdmin: idsResevervedForAdmins.includes(user.id)
    });

    if (!uc) {
        console.log("Err while creating user");
        return res.status(401).json({ msg: "user already exists or an error occured" });
    }

    console.log("created: ", user);

    const token = genToken(user);

    return res.status(201).json({ msg: "user created!", ...token });
});

router.get("/users/courses", verifyToken, async (req, res) => {
    const user = req.body.user as IUserPayload;
    if (!user) return res.status(400).json({ msg: "User id not specified" });

    const resp = await db.course.getEnrolledCourses(user.id);

    if (!resp) return res.status(404).json({ msg: "User with given ID doesnt exist!" });

    return res.status(201).json(
        resp.map((it) => {
            return {
                id: it.id,
                title: it.title,
                description: it.description,
                duration: it.duration,
                category: it.category
            };
        })
    );
});

router.get("/users", verifyAdmin, async (req, res) => {
    const users: IUser[] = (await db.user.listUsers()).map((it) => {
        return {
            id: it.id,
            fname: it.fname,
            lname: it.lname,
            courses: it.courses,
            email: it.email,
            isAdmin: it.isAdmin
        };
    });

    return res.status(200).json(users);
});

// No admin verification since the user should be able to delete this profile
router.delete("/users", verifyToken, async (req, res) => {
    const userId = req.body.user.id;
    if (!userId) return res.status(400).json({ msg: "User ID is required" });

    try {
        const response = await db.user.deleteUser(parseInt(userId));
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error deleting user" });
    }
});

export const usersRouter = router;
