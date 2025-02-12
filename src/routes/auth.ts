import { Router } from "express";
import { IUser } from "../database/types";
import Database from "../database/database";

const router = Router();

const db = new Database();

router.post("/signup", async (req, res) => {
  const user: IUser = req.body;

  if (!user.fname) return res.status(400).json({ msg: "fname is not provided!" });
  if (!user.lname) return res.status(400).json({ msg: "lname is not provided!" });
  if(!user.id) return res.status(400).json({"msg": "id is not provided!"});

  await db.user.createUser({ ...user, courses: [] });
  console.log("created: ", user);
  return res.status(201).json({"msg": "user created!"})
});

export const authRouter = router;
