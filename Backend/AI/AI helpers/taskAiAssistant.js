import { getLatestTaskChats } from "../../DBQuery/AiTaskChatDbQuary.js"
import summarisedTaskDetailByTaskId from "../../helper/summarisedTaskDetailByTaskId.js"
import { generateAIResponse } from "../GeminiServices.js"

export const taskAssistentReply = async (taskId, userPrompt) => {
    const systemPrompt = `You are Tasky AI — an intelligent assistant that helps users manage, understand, and complete their tasks efficiently. Always read task details first. Use the chat history to keep context. Answer concisely and provide actionable steps when needed.`

    const [taskDetails, latestChats] = await Promise.all([
        summarisedTaskDetailByTaskId(taskId),
        getLatestTaskChats(taskId, 5)
    ])

    // build AI input payload
    const contents = [];

    // 1️⃣ Add system prompt (as a pseudo-system message)
    contents.push({
        role: "user",
        parts: [{ text: `SYSTEM PROMPT:\n${systemPrompt}` }],
    });

    // 2️⃣ Add task details
    contents.push({
        role: "user",
        parts: [{ text: `TASK DETAILS:\n${taskDetails}` }],
    });

    // 3️⃣ Add last few chat messages
    if (latestChats.length > 0) {
        for (const msg of latestChats) {
            contents.push({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.message }],
            });
        }
    } else {
        contents.push({
            role: "model",
            parts: [{ text: `Let's start! How can I assist you with "${taskDetails}" today?` }],
        })
    }

    // 4️⃣ Add new user question
    contents.push({
        role: "user",
        parts: [{ text: userPrompt }],
    });

    // console.dir(contents, { depth: null })

    const response = await generateAIResponse(contents)

    return response
}