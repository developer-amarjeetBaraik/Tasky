import express from 'express'
import taskRouter from './taskRoute.js'
import AppError from '../errors/appError.js'
import toMongoObjectId from '../utils/toMongoObjectId.js'
import { createTask, getTasksByBoardId } from '../DBQuery/taskDbQuary.js'

const router = express.Router({ mergeParams: true })

const testBoardId = process.env.TEST_BOARD_ID

router.use('/task/:taskId', taskRouter)

router.get('/tasks', async (req, res, next) => {
    let { boardId } = req.params
    if (!boardId) throw new AppError("Can't process this request without board id.")

    boardId = toMongoObjectId(boardId, 'boardId')

    try {
        const tasks = await getTasksByBoardId(boardId)
        if (tasks) {
            return res.status(200).json({
                statusCode: 200,
                message: `Tasks for boardId: ${boardId}.`,
                tasks
            })
        }
        res.status(200).json({
            statusCode: 200,
            message: `No task found for this board(${boardId}).`
        })
    } catch (error) {
        next(error)
    }
})

router.post('/create-task', async (req, res, next) => {
    let userId = req.user.id
    let { boardId } = req.params
    let { title, description, priority, status } = req.body

    userId = toMongoObjectId(userId, 'userId')
    boardId = toMongoObjectId(boardId, 'boardId')

    title = title?.trim()
    description = description?.trim()
    priority = priority?.trim()
    status = status?.trim()

    if (!title || title.length < 5 || typeof (title) === String) {
        throw new AppError("'title' can't be undefined, less then 5 characters or can be only string.", 400)
    }
    if (!description || description.length < 10 || typeof (description) === String) {
        throw new AppError("'description' can't be undefined, less then 10 characters or can be only string.", 400)
    }
    if (!priority || !priority === ('Low' || 'Medium' || 'High')) {
        throw new AppError("'priority' can't be undefined or can be only 'Low', 'Medium' or 'High'.", 400)
    }
    if (!status || !status === ('Todo' || 'In Progress' || 'Done')) {
        throw new AppError("'status' can't be undefined or can be only 'Todo', 'In Progress' or 'Done'.", 400)
    }

    try {
        const newTask = await createTask(boardId, userId, title, description, priority, status)
        if (!newTask) throw new AppError("Something went wrong.", 500)
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Task created successfully.',
            task: newTask
        })
    } catch (error) {
        next(error)
    }
})

export default router