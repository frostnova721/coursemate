import Course from './course.js'
import Admin from "./admin.js";
import mongoose from "mongoose";
import { UserDB } from './user.js';

export default class Database {

  async connect() {
    try {

      const uri = process.env.MONGO_URI;

      if(!uri) {
        console.error("MONGO URI IS NOT PROVIDED");
        return;
      }

      console.log("Connecting to database...");

      await mongoose.connect(uri);

      console.log("Connected to database!");
      
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
