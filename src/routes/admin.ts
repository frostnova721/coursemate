import { Router } from "express";
import Database from "../database/database";
import { ICourse, IUser } from "../database/types";

const router = Router();

const db = new Database();

router.post("/create", async (req, res) => {
  const {
    id,
    title,
    desc,
    duration,
    category
  }: {
    id: number;
    title: string;
    desc: string;
    duration: number;
    category: string[];
  } = req.body;

  if(!id || !title || !desc || !duration || !category || category.length == 0) {
    return res.status(400).json({msg: "Course parameters are missing! \n id, title, duration, desc, catergory are required"})
  }

  console.log(req.body);
  
  try {
    await db.admin.createCourse({
      id,
      title,
      description: desc,
      duration,
      category,
      studentsEnrolled: []
    });

    res.status(200).json({ msg: "admin course create" });
  } catch (err) {
    console.error("Error creating course", err);
    res.status(400).json({ msg: "smths wrong!" });
  }
});

router.get("/delete", async (req, res) => {
  if (!req.query.id) return res.status(403).json({ msg: "id is missing!" });

  await db.admin.deleteCourse({ courseId: req.query.id });
  res.status(200).json({ msg: "admin course delete" });
});

router.get("/list/courses", async (req, res) => {
  const courses: ICourse[] = (await db.course.listAllCourses()).map((it) => {
    return {
      id: it.id,
      title: it.title,
      category: it.category,
      description: it.description,
      duration: it.duration,
      studentsEnrolled: it.studentsEnrolled,
    };
  });
  return res.status(200).json(courses);
});

router.get("/list/users", async (req, res) => {
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

export const adminRouter = router;
