import express from "express";
import { config } from "dotenv";
import { courseRouter } from "./routes/course.js";
import Database from "./database/database.js";
import { adminRouter } from "./routes/admin.js";
import { usersRouter } from "./routes/users.js";
import { verifyToken } from "./middlewares/tokenVerifier.js";
import { tokenRouter } from "./routes/token.js";
import { verifyAdmin } from "./middlewares/adminVerifier.js";

config();

new Database().connect().then(() => {
    const app = express();

    const port = 8080;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const openRoutes = ["/users", "/token/refresh"];
        if (openRoutes.includes(req.path)) return next();
        return verifyToken(req, res, next);
    });

    app.get("/", (req, res) => {
        res.status(200).json({ msg: "server is up n running!" });
    });

    app.use(courseRouter);

    app.use("/admin", adminRouter);

    // No verification here since the creation of user shouldnt require a token
    app.use(usersRouter);

    // No verification here too since the user may have the expired -
    // token when trying to refresh
    app.use("/token", tokenRouter);

    app.listen(port, () => {
        console.log(
            `Server started at port ${port} \nctrl+click to open in browser -> http://127.0.0.1:${port}/`
        );
    });
});
