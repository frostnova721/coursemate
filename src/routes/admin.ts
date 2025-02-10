import { Router } from "express";
import Database from "../database/database";

const router = Router();

router.post("/create", async (req, res) => {
  const {
    id,
    title,
    desc,
    duration,
    category,
  }: {
    id: number;
    title: string;
    desc: string;
    duration: number;
    category: string[];
  } = req.body;

  console.log(req.body);
  try {
  const db = new Database();

  await db.admin.createCourse({id, title, description: desc, duration, category});

  res.status(200).json({ msg: "admin course create" });
  } catch(err) {
    console.error("Error creating course",err);
    res.status(400).json({msg: "smths wrong!"})
  }
});

router.get("/delete", async (req, res) => {
    const db = new Database();

    if(!req.query.id) return res.status(403).json({msg: "id is missing!"});

    await db.admin.deleteCourse({courseId: req.query.id})
  res.status(200).json({ msg: "admin course delete" });
});

export const adminRouter = router;
