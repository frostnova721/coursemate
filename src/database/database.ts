import Course from './course.js'
import Admin from "./admin.js";
import mongoose from "mongoose";
import { UserDB } from './user.js';

export default class Database {

  async connect() {
    try {
      // if (Database.client != null) return true;

      const uri = process.env.MONGO_URI;

      if(!uri) {
        console.error("MONGO URI IS NOT PROVIDED");
        return;
      }

      // Database.client = new MongoClient(uri);

      console.log("Connecting to database...");

      await mongoose.connect(uri);
      // await Database.client.connect();

      console.log("Connected to database!");

      // const db = Database.client.db("coursemate");
      // Database.collection = db.collection("entries");
      return true;
    } catch (err) {
      console.error("Error connecting to database: ", err);
      return false;
    }
  }

  public course = new Course();

  public admin = new Admin();

  public user = new UserDB();
}
