import AiClient from "@repo/ai-model";
import { prismaClient } from "@repo/db/client";
import { Router } from "express";
import { ArtifactProcessor } from "@repo/ai-model/parser/ArtifactProcessor.ts";
import { onShellCommand, onFileUpdate } from "@repo/ai-model/os/os.ts";
import { systemPrompt } from "@repo/ai-model/prompts/systemPrompt.tsx";
import type { ChatCompletionMessageParam } from "@repo/ai-model/types.ts"

const promptRouter = Router();

promptRouter.post("/", async (req, res) => {
    const { prompt, projectId } = req.body;

    if(!prompt || !projectId) {
        res.status(400).json({ messages: "prompt or projectId not found" });
        return;
    }

    try {
        await prismaClient.prompt.create({
            data: {
                content: prompt,
                projectId,
                type: "User"
            }
        })

        const allPrompt = await prismaClient.prompt.findMany({
            where: { projectId },
            orderBy: { createdAt: "asc" }
        });

        let artifactProcess = new ArtifactProcessor("", onFileUpdate, onShellCommand);
        let artifact = "";

        console.log(allPrompt.map(p => ({
                role: p.type === "User" ? "User" : "System",
                content: p.content
            })))

        const messages: ChatCompletionMessageParam[] = [];

        if(systemPrompt) messages.push({ role: "system", content: systemPrompt });

        messages.push(...allPrompt.map(p => ({
                role: p.type === "User" ? "user" : "system",
                content: p.content
        } as const)));
        
        const stream = await AiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 500, // 8000
            stream: true
        })

        for await (const chunk of stream) {
            const text = chunk.choices?.[0]?.delta.content || "";
            artifactProcess.append(text);
            artifactProcess.parse();
            artifact += text;
        }

        await prismaClient.prompt.create({
            data: { content: artifact, projectId, type:"System" }
        })

        res.json({ msg: "check logs!!" });
    } catch (error) {
        console.log("error in prompt router :: ", error);
        res.status(500).json({ msg: "Could not follow the request, please try agian later" })
    }
})

export default promptRouter;