import { Router, Request, Response } from "express";
import Database from "../database/database.js";

const router = Router();

const db = new Database();

router.post("/enroll", async (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    return res.status(400).json({ msg: "missing userId or courseId" });
  }
  const results = await Promise.all([
    db.admin.getCourse(courseId),
    db.user.getUser(userId)
  ]);

  if (!results[1] || results[1] == null) {
    return res.status(404).json({ msg: "User with the given id doesnt exist!" });
  } else if (!results[0] || results[0] == null) {
    return res.status(404).json({ msg: "Couldnt find a course with given ID" });
  }

  await db.course.createCourseEntry(results[1], results[0]);
  res.status(201).json({ msg: "create route" });
});

router.get("/optout", (req: Request, res: Response) => {
  const userId = req.query.user?.toString();
  const course = req.query.course?.toString();

  if (!userId || !course) return res.status(400).json({ msg: "missing id's" });

  db.course.deleteCourseEntry({ id: parseInt(userId), courseId: parseInt(course) });
  res.status(200).json({ msg: "delete route" });
});



export const courseRouter = router;
