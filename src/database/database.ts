import { Collection, MongoClient } from "mongodb"; // import mogodb client
import Course from './course.js' // import course class
import Admin from "./admin.js"; // import admin class
import mongoose from "mongoose"; // import mongoose for schema management

export default class Database {  
  static client: MongoClient | null = null;

  static collection: Collection | null = null;

  async connect() {
    try {
      if (Database.client != null) return true;

      const uri = process.env.MONGO_URI;

      if(!uri) { 
        console.error("MONGO URI IS NOT PROVIDED");
        return;
      }

      Database.client = new MongoClient(uri);

      console.log("Connecting mongoose...");
      await mongoose.connect(uri); // connect mongoose
      console.log("Mongoose connected!");

      console.log("Connecting to database...");

      await Database.client.connect(); // connect mongodb

      console.log("Connected to database!");

      const db = Database.client.db("coursemate");
      Database.collection = db.collection("entries");
      return true;
    } catch (err) {
      console.error("Error connecting to database: ", err);
      return false;
    }
  }

  public course = new Course(); // instance of course

  public admin = new Admin(); // instance of admin
}
