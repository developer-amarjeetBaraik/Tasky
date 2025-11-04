import mongoose from "mongoose"
import { taskAssistentReply } from "../../AI/AI helpers/taskAiAssistant.js"
import AiChatForTask from "../../models/AiChatForTaskSchema.js"

export const handleTaskNewPrompt = async (socket, namespace, data) => {
    const { taskId, prompt } = data
    const { _id } = res.user

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const userNewPrompt = new AiChatForTask({
            taskId,
            userId: _id,
            message: prompt,
            role: 'user'
        })

        await userNewPrompt.save({ session })

        const fullReply = await taskAssistentReply(taskId, prompt, (chunkReply) => {
            socket.emit('task_ai_chunk_reply', {
                taskId,
                chunkReply
            })
        })

        const assistentNewReply = new AiChatForTask({
            taskId,
            userId: _id,
            message: fullReply,
            role: "assistant"
        })

        await assistentNewReply.save({ session })
        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction()
        // sending signal if any error arise
        socket.emit('task_ai_error', {
            taskId,
            message: 'Something went wrong.'
        })
        console.error('Task AI error', error)
    } finally {
        session.endSession()
    }
}