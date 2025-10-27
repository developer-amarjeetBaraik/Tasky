import express from 'express'
import { findTaskByTaskId } from '../DBQuery/taskDbQuary.js'
import { taskAssistentReply } from '../AI/AI helpers/taskAiAssistant.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('Got request on AI route.')
    res.json({
        status: 200,
        message: 'Got request on AI endpoint.'
    })
})

const TaskAiRoute = express.Router({ mergeParams: true })

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