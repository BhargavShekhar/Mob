import { prismaClient } from "@repo/db/client";
import { Router } from "express";
import { auth } from "../middleware";

const createProject = Router();

createProject.post("/", auth, async (req, res) => {
    const { prompt } = req.body;
    const userId = req.userId!;

    if(!prompt) {
        res.status(400).json({ msg: "did not recieved any prompt" });
        return;
    }

    // TODO add logic to add description with the help of LLM Api
    const description = prompt.split("/n")[0];

    try {
        const project = await prismaClient.project.create({
            data: { description, userId }
        })

        res.json({ projectId: project.id });
    } catch (error) {
        console.log("Cound not create project:: ", error);
        res.status(500).json({ msg: "please try again later" });
    }

})

export default createProject;