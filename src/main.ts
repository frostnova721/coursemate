import express from "express";
import { config } from "dotenv";
import { courseRouter } from "./routes/course.js";
import Database from "./database/database.js";
import { adminRouter } from "./routes/admin.js";

config();

new Database().connect().then(() => {

  const app = express();

  const port = 8080;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.status(200).json({ msg: "server is up n running!" });
  });

  app.use("/course", courseRouter);

  app.use('/admin', adminRouter)

  app.listen(port, () => {
    console.log(
      `Server started at port ${port} \nctrl+click to open in browser -> http://127.0.0.1:${port}/`
    );
  });
});
