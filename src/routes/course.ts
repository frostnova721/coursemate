import { Router, Request, Response } from "express";
import Database from "../database/database.js";
import { IUserPayload } from "../database/types.js";

const router = Router();

const db = new Database();

router.get("/enroll", async (req: Request, res: Response) => {
    const { courseId } = req.query;
    const user: IUserPayload = req.body.user;
    if (!user.id || !courseId || !parseInt(courseId as string)) {
        return res.status(400).json({ msg: "missing userId or courseId" });
    }
    const results = await Promise.all([
        db.admin.getCourse(parseInt(courseId as string)),
        db.user.getUser(user.id)
    ]);

    if (!results[1] || results[1] == null) {
        return res.status(404).json({ msg: "User with the given id doesnt exist!" });
    } else if (!results[0] || results[0] == null) {
        return res.status(404).json({ msg: "Couldnt find a course with given ID" });
    }

    await db.course.createCourseEntry(results[1], results[0]);
    res.status(201).json({ msg: "create route" });
});

router.get("/optout", async (req: Request, res: Response) => {
    const course = req.query.course?.toString();
    const userId = req.body.user.id;

    if (!userId || !course) return res.status(400).json({ msg: "missing id's" });

    const result = await db.course.deleteCourseEntry({
        id: parseInt(userId),
        courseId: parseInt(course)
    });

    if (!result)
        return res.status(404).json({ msg: "user not enrolled in provided course" });

    res.status(200).json({ msg: "delete route" });
});

export const courseRouter = router;
