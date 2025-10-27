import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config.js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" }); // or "gemini-1.5-pro"

export const generateAIResponse = async (contents, onChunk) => {
    try {
        const streamingResult = await model.generateContentStream({contents})

        let finalText = "";

        for await (const chunk of streamingResult){
            const chunkText = chunk.text();
            finalText += chunkText

            if(onChunk) onChunk(chunkText)
        }

        return finalText
    } catch (error) {
        console.error("Error with Gemini:", error);
        throw new DevError(error)
    }
};