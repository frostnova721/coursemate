import { Router } from "express";
import Database from "../database/database.js";

const router = Router();

router.post("/enroll", (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    return res.status(400).json({ msg: "missing userId or courseId" });
  }
  const db = new Database();
  db.createCourseEntry({ id: userId, courseId: courseId });
  res.status(200).json({ msg: "create route" });
});

router.get("/optout", (req, res) => {
  const userId = req.query.user;
  const course = req.query.course;

  if (!userId || !course) return res.status(400).json({ msg: "missing id's" });

  const db = new Database();

  db.deleteCourseEntry({ id: userId, courseId: course });
  res.status(200).json({ msg: "delete route" });
});

router.get("/list", async (req, res) => {
  const user = req.query.user;
  if (!user) return res.status(400).json({ msg: "User id not specified" });
  const resp = await new Database().getEnrolledCourses({ id: user });
  console.log(resp);
  res.status(200).json(resp);
});

export default router;
