import { GoogleGenAI } from '@google/genai'
import 'dotenv/config.js'
import DevError from '../errors/devError.js';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAIResponse = async (contents, onChunk) => {

    // console.log(await genAI.models.list())

    try {
        const streamingResult = await genAI.models.generateContentStream({
            model: 'gemini-2.0-flash-lite',
            contents
        })

        let finalText = "";

        for await (const chunk of streamingResult) {
            const chunkText = chunk.text;
            finalText += chunkText

            if (onChunk) onChunk(chunkText)
        }

        return finalText
    } catch (error) {
        console.error("Error with Gemini:", error);
        throw new DevError(error)
    }
};