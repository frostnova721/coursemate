import { Router } from "express";
import Database from "../database/database";
import { ICourse, IUser } from "../database/types";
import { verifyAdmin } from "../middlewares/adminVerifier";

const router = Router();

const db = new Database();

router.use(verifyAdmin()); // append the verifier mw

router.post("/courses", async (req, res) => {
    const {
        id,
        title,
        description,
        duration,
        category
    }: {
        id: number;
        title: string;
        description: string;
        duration: number;
        category: string[];
    } = req.body;

    if (!id || !title || !description || !duration || !category || category.length == 0) {
        return res.status(400).json({
            msg: "Course parameters are missing! id, title, duration, desc, catergory are required"
        });
    }

    console.log(req.body);

    try {
        await db.admin.createCourse({
            id,
            title,
            description: description,
            duration,
            category
        });

        res.status(201).json({ msg: "admin course create" });
    } catch (err) {
        console.error("Error creating course", err);
        res.status(400).json({ msg: "smths wrong!" });
    }
});

router.delete("/courses/:courseId", async (req, res) => {
    if (!req.params.courseId) return res.status(403).json({ msg: "id is missing!" });

    await db.admin.deleteCourse({ courseId: req.params.courseId });
    res.status(200).json({ msg: "admin course delete" });
});

router.get("/courses", async (req, res) => {
    const courses: ICourse[] = (await db.course.listAllCourses()).map((it) => {
        return {
            id: it.id,
            title: it.title,
            category: it.category,
            description: it.description,
            duration: it.duration
        };
    });
    return res.status(200).json(courses);
});

export const adminRouter = router;
