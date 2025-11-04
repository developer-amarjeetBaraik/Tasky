import express from 'express'
import { findTaskByTaskId } from '../DBQuery/taskDbQuary.js'
import { taskAssistentReply } from '../AI/AI helpers/taskAiAssistant.js'
import AppError from '../errors/appError.js'
import { getLatestTaskChats } from '../DBQuery/AiTaskChatDbQuary.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('Got request on AI route.')
    res.json({
        status: 200,
        message: 'Got request on AI endpoint.'
    })
})

const TaskAiRoute = express.Router({ mergeParams: true })

TaskAiRoute.get('/ai-chats', async (req, res, next) => {
    const { taskId, userId, limit = 10, skipTo = 0 } = req.query
    if (!taskId) throw new AppError(`'taskId' can't be undefined, pass taskId in query.`)
    if (!userId) throw new AppError(`'userId' can't be undefined, pass userId in query.`)
    try {
        const task = await findTaskByTaskId(taskId)
        const latestChat = await getLatestTaskChats(taskId, limit, skipTo)

        if (!task, !latestChat) console.log('Something went wrong')
        if (!task, !latestChat) throw new AppError('Something went wrong', 500)

        res.status(200).json({
            statusCode: 200,
            task,
            chats: latestChat,
            message: "Here are your task details and latest message."
        })
    } catch (error) {
        next(error)
    }


})

TaskAiRoute.post('/ai-assistance', async (req, res, next) => {
    const { taskId, userId } = req.query
    const { userPrompt } = req.body

    const response = await taskAssistentReply(taskId, userPrompt)

    if (!taskId || !userId) return res.status(400).json({
        statusCode: 400,
        message: "taskId or userId missing."
    })

    res.status(200).json(response)
})

router.use('/task', TaskAiRoute)

export default router