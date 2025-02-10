import { Router, Request, Response } from "express";
import Database from "../database/database.js";

const router = Router();

router.post('/enroll', (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    return res.status(400).json({ msg: "missing userId or courseId" });
  }
  const db = new Database();
  db.course.createCourseEntry({ id: userId, courseId: courseId });
  res.status(200).json({ msg: "create route" });
});

router.get("/optout", (req: Request, res: Response) => {
  const userId = req.query.user?.toString();
  const course = req.query.course?.toString();

  if (!userId || !course) return res.status(400).json({ msg: "missing id's" });

  const db = new Database();
  db.course.deleteCourseEntry({ id: parseInt(userId), courseId: parseInt(course) });
  res.status(200).json({ msg: "delete route" });
});

router.get("/list", async (req: Request, res: Response) => {
  const user = req.query.user?.toString();
  if (!user) return res.status(400).json({ msg: "User id not specified" });

  const resp = await new Database().course.getEnrolledCourses({ id: parseInt(user) });
  console.log(resp);
  res.status(200).json(resp);
});

export const courseRouter = router;
