import { Course } from "./schemas";
import { ICourse } from "./types";

export default class Admin {
    async createCourse(course: ICourse) {
        await Course.updateOne({ id: course.id },
            { $set: course },
            { upsert: true },
        );
    }

    async deleteCourse({
        courseId,
    }) { 
        await Course.deleteOne({id: courseId})
    }

    async getCourse(courseId: number): Promise<ICourse> {
        return await Course.findOne({id: courseId});
    }
}