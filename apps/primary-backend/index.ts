import express from "express";
import cors from "cors";
import createProject from "./routes/create_project.route";
import getProjectRouter from "./routes/get_projects.route";

const port = 8080;

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json("ping");
})

app.use("/project", createProject);
app.use("/get-project", getProjectRouter);

app.listen(port, () => {
    console.log(`---- Server is Running at port ${port} ----`);
})