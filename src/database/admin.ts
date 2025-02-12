import { Course } from "./schemas"; // importing course model
import { ICourse } from "./types"; // importing the ICourse interface

export default class Admin {  // method to create or update a course in db
    async createCourse(course: ICourse) {
        await Course.updateOne(
            { id: course.id }, // find course by id
            { $set: course }, // set the new data
            { upsert: true }, // insert if data doesn't exist
        );
    }

    // method to delete a course from db
    async deleteCourse({ courseId }) { 
        await Course.deleteOne({id: courseId}); // delete the course by id 
    }
}