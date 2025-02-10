import Database from "./database";

export default class Admin {
    async createCourse({
        courseId,
        courseName,
        courseDuration,
    }) {
        const db = Database.client;
        // coll.
    }

    async deleteCourse({
        courseId,
    }){}
}