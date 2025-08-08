import express from "express";
import cors from "cors";
import promptRouter from "./routes/prompt.router";

const port = 8081;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "ping!!" });
})

app.use("/prompt", promptRouter);

app.listen(port, () => {
    console.log(`----- Worker Server Started on Port: ${port} -----`);
})