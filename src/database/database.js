import { Collection, MongoClient } from "mongodb";

export default class Database {
  // constructor() {
  //     if(this.client === null) {
  //         this.connect();
  //     }
  // }

  /** @type {MongoClient} */
  static client = null;

  /** @type {Collection} */
  static collection = null;

  async connect() {
    try {
      if (Database.client != null) return true;
      const uri = process.env.MONGO_URI;
      Database.client = new MongoClient(uri);

      console.log("Connecting to database...");

      await Database.client.connect();

      console.log("Connected to database!");

      const db = Database.client.db("coursemate");
      Database.collection = db.collection("entries");
      return true;
    } catch (err) {
      console.error("Error connecting to database: ", err);
      return false;
    }
  }

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
        { $push: { courses: courseId } },
        { upsert: true }
      );
      console.log(`Added course entry ${courseId} to user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCourseEntry({ id, courseId }) {
    try {
      const userEnrolled = await Database.collection.findOne({ id });
      console.log(userEnrolled);
      if (!(userEnrolled?.courses.includes(courseId))) {
        console.log(`Error: User ${id} is not enrolled in course ${courseId}!`);
        return;
      }
      const item = {
        id: id,
        courses: userEnrolled.courses.filter((course) => course !== courseId),
      };
      await Database.collection.updateOne(
        { id },
        { $push: { courses: courseId } },
        { upsert: true }
      );
      console.log(`Deleted course entry ${courseId} from user ${id}!`);
    } catch (err) {
      console.error(err);
    }
  }

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
