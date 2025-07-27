import { prismaClient } from "@repo/db/client";
import { Router } from "express";
import { auth } from "../middleware";

const getProjectRouter = Router();

getProjectRouter.get("/", auth, async (req, res) => {
    const userId = req.userId!;

    try {
        const projects = await prismaClient.project.findFirst({
            where: { userId }
        });
        res.json({ projects });
    } catch (error) {
        console.log("could not get projects :: ", error);
        res.status(500).json({ msg: "could not get projects" });
    }
})

export default getProjectRouter;