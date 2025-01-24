import express from "express";
import { config } from "dotenv";
import  router from "./routes/course.js";
import Database from "./database/database.js";

config();

await new Database().connect();

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server is up n running!" });
});

app.use("/course", router);

app.listen(port, (err) => {
  console.log(
    `Server started at port ${port} \nctrl+click to open in browser -> http://127.0.0.1:${port}/`
  );
});
