import Database from "./database.js";

export default class Course {
  /**
   *
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async createCourseEntry({ id, courseId }) {
    try {
      const userEnrolled = await Database.collection.findOne({ id });
      if (userEnrolled?.courses.includes(courseId)) {
        console.log(
          `Error: User ${id} is already enrolled in course ${courseId}!`
        );
        return;
      }
      await Database.collection.updateOne(
        { id },
        //@ts-ignore
        { $push: { courses: courseId } },
        { upsert: true }
      );
      console.log(`Added course entry ${courseId} to user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async deleteCourseEntry({ id, courseId }) {
    try {
      const userEnrolled = await Database.collection.findOne({ id });
      console.log(userEnrolled);
      if (!userEnrolled?.courses.includes(courseId)) {
        console.log(`Error: User ${id} is not enrolled in course ${courseId}!`);
        return;
      }
      await Database.collection.deleteOne(
        { id },
        //@ts-ignore
        { $push: { courses: courseId } },
      );
      console.log(`Deleted course entry ${courseId} from user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 
   * @param {{userId: int}} {id: userId}
   * @returns {int[]} list of courses enrolled by user (in id's)
   */
  async getEnrolledCourses({ id }) {
    try {
      const enrolled = await Database.collection.findOne({ id });
      console.log(enrolled);
      if (!enrolled) return [];
      return enrolled.courses;
    } catch (err) {
      console.log(err);
    }
  }
}
