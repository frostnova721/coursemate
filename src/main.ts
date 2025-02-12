import express from "express"; // express
import { config } from "dotenv"; // env variable
import { courseRouter } from "./routes/course.js"; // course routes
import Database from "./database/database.js"; // db
import { adminRouter } from "./routes/admin.js"; // admin routes

config(); // load env variable

new Database().connect().then(() => {

  const app = express(); // create express app

  const port = 8080;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.status(200).json({ msg: "server is up n running!" });
  });

  app.use("/course", courseRouter); // register course routes

  app.use('/admin', adminRouter); // register admin routes

  app.listen(port, () => {
    console.log(
      `Server started at port ${port} \nctrl+click to open in browser -> http://127.0.0.1:${port}/`
    );
  });
});
