import express from 'express';

const app = express();

const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({msg: "server is up n running!"});
});

app.listen(port, (err) => {
    console.log(`Server started at port ${port} \nctrl+click to open in browser -> http://127.0.0.1:${port}/`);
});