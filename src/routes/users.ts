import { Router } from "express";
import { IUser } from "../database/types";
import Database from "../database/database";

const router = Router();

const db = new Database();

router.post("/users", async (req, res) => {
  const user: IUser = req.body;

  if (!user.fname) return res.status(400).json({ msg: "fname is not provided!" });
  if (!user.lname) return res.status(400).json({ msg: "lname is not provided!" });
  if(!user.id) return res.status(400).json({"msg": "id is not provided!"});

  await db.user.createUser({ ...user, courses: [] });
  console.log("created: ", user);
  return res.status(201).json({"msg": "user created!"})
});

router.get("/users/:userId/courses", async (req, res) => {
  const user = req.params.userId;
  if (!user) return res.status(400).json({ msg: "User id not specified" });

  const resp = await db.course.getEnrolledCourses(parseInt(user));

  if (!resp)
    return res.status(404).json({ msg: "User with given ID doesnt exist!" });

  return res.status(201).json(resp.map((it) => {
    return {
       id: it.id,
       title: it.title,
       description: it.description,
       duration: it.duration,
       category: it.category,
    };
  }));
});

router.get("/users", async (req, res) => {
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

export const usersRouter = router;
