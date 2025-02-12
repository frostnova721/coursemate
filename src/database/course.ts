import { User, Course as CourseSchema } from "./schemas.js";
import { ICourse, IUser } from "./types.js";

export default class Course {
  /**
   *
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async createCourseEntry(user: IUser, course: ICourse) {
    try {
      const userEnrolled = await User.findOne({ id: user.id, "courses.id": course.id });
      if (userEnrolled?.courses) {
        console.log(`Error: User ${user.id} is already enrolled in course ${course.id}!`);
        return;
      }
      await User.updateOne(
        { id: user.id },
        { $addToSet: { courses: course } } // changed from the $push cus set will ensure uniqueness
      );
      await CourseSchema.updateOne(
        { id: course.id },
        { $addToSet: { studentsEnrolled: user } }
      );
      console.log(`Added course entry ${course.id} to user ${user.id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * @param {{userId: int, courseId: int}}
   * @returns {void} nothing
   */
  async deleteCourseEntry({ id, courseId }: { id: number; courseId: number }) {
    try {
      const userEnrolled = await User.findOne({id});
      console.log(userEnrolled);
      if (!userEnrolled) {
        console.log(`Error: User ${id} is not enrolled in course ${courseId}!`);
        return;
      }
      await userEnrolled.updateOne({ id }, { $pull: { courses: { id: courseId } } });
      await console.log(`Deleted course entry ${courseId} from user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * @param {{userId: int}} {id: userId}
   * @returns {int[]} list of courses enrolled by user (in id's)
   */
  async getEnrolledCourses(id: number): Promise<ICourse[] | null> {
    try {
      const enrolled = await User.findOne({ id }).populate<{courses: ICourse[]}>(
        "courses"
      );
      console.log(enrolled);
      return enrolled.courses;
    } catch (err) {
      console.log(err);
    }
  }

  async listAllCourses(): Promise<ICourse[]> {
    return CourseSchema.find().populate<IUser>("studentsEnrolled") ?? [];
  }
}
