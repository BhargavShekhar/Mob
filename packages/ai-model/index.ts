import OpenAI from "openai";

const AiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export default AiClient;