import Database from "./database.js"; // imprting db class

export default class Course {
  /**
   * enroll a user in a course
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async createCourseEntry({ id, courseId }) {
    try {
      // check if the user is already enrolled in the course
      const userEnrolled = await Database.collection.findOne({ id });
      if (userEnrolled?.courses.includes(courseId)) {
        console.log(
          `Error: User ${id} is already enrolled in course ${courseId}!`
        );
        return;
      }

      // add the course to user's list of courses
      await Database.collection.updateOne(
        { id },
        //@ts-ignore
        { $push: { courses: courseId } }, // push courseid to teh courses
        { upsert: true } // create new record if user doesn't exist
      );
      console.log(`Added course entry ${courseId} to user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * remove a user from a course
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async deleteCourseEntry({ id, courseId }: {id: number, courseId: number}) {
    try {
      // check if the user is enrolled
      const userEnrolled = await Database.collection.findOne({ id });
      console.log(userEnrolled);
      if (!userEnrolled?.courses.includes(courseId)) {
        console.log(`Error: User ${id} is not enrolled in course ${courseId}!`);
        return;
      }

      // remove the course from user's list
      await Database.collection.deleteOne({ id });
      console.log(`Deleted course entry ${courseId} from user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * get all courses a user is enrolled in
   * @param {{userId: int}} {id: userId}
   * @returns {int[]} list of courses enrolled by user (in id's)
   */
  async getEnrolledCourses({ id }) {
    try {
      const enrolled = await Database.collection.findOne({ id });
      console.log(enrolled);
      if (!enrolled) return [];
      return enrolled.courses; // return list of enrolled courses
    } catch (err) {
      console.log(err);
    }
  }
}
