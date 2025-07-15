import express from 'express'
import { changeTaskAssignedTo, changeTaskDescription, changeTaskPosition, changeTaskPriority, changeTaskStatus, changeTaskTitle, deleteTask } from '../DBQuery/taskDbQuary.js'
import toMongoObjectId from '../utils/toMongoObjectId.js'
import AppError from '../errors/appError.js'
import isThisTaskExistInBoard from '../DBQuery/utilsDbQuray/isThisTaskExistInBoard.js'
import { checkBoardMembershipByUserId } from '../DBQuery/boardDbQuary.js'

const router = express.Router({ mergeParams: true })

router.delete('/delete-task', async (req, res, next) => {
    let { boardId, taskId } = req.params
    if (!taskId) throw new AppError('Not get `taskId` as query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)

    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {

        const isDeleted = await deleteTask(taskId)
        if (isDeleted) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: `Task(${taskId}) deleted successfully from board(${boardId}).`
            })
        }
        res.status(500).json({
            statusCode: 500,
            message: `Something went wrong.`
        })

    } catch (error) {
        next(error)
    }
})

router.patch('/change-status', async (req, res, next) => {
    let userId = req.user.id
    let { boardId, taskId } = req.params
    let newStatus = req.query?.newStatus

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!newStatus) throw new AppError("Not get `newStatus` in query.", 400)
    if (!['Todo', 'In Progress', 'Done'].includes(newStatus)) throw new AppError("newStatus query can be only 'Todo', 'In Progress', or 'Done'.")

    userId = toMongoObjectId(userId, 'userId')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {
        const isStatusChanged = await changeTaskStatus(taskId, newStatus, userId)
        if (isStatusChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Status changed successfully.',
                updatedTask: isStatusChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/change-priority', async (req, res, next) => {
    let userId = req.user.id
    let { boardId, taskId } = req.params
    let newPriority = req.query?.newPriority

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!newPriority) throw new AppError("Not get `newPriority` in query.", 400)
    if (!['Low', 'Medium', 'High'].includes(newPriority)) throw new AppError("newPriority query can be only 'Low', 'Medium', or 'High'.")

    userId = toMongoObjectId(userId, 'userId')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {
        const isPriorityChanged = await changeTaskPriority(taskId, newPriority, userId)
        if (isPriorityChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Priority changed successfully.',
                updatedTask: isPriorityChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/change-title', async (req, res, next) => {
    let userId = req.user.id
    let { boardId, taskId } = req.params
    let newTitle = req.query?.newTitle

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!newTitle) throw new AppError("Not get `newTitle` in query.", 400)
    if (newTitle.length < 5) throw new AppError("Title can't be less then 5 character.")

    userId = toMongoObjectId(userId, 'userId')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {
        const isTitleChanged = await changeTaskTitle(taskId, newTitle, userId)
        if (isTitleChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Title changed successfully.',
                updatedTask: isTitleChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/change-description', async (req, res, next) => {
    let userId = req.user.id
    let { boardId, taskId } = req.params
    let newDescription = req.query?.newDescription

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!newDescription) throw new AppError("Not get `newDescription` in query.", 400)
    if (newDescription.length < 10) throw new AppError("Title can't be less then 10 character.")

    userId = toMongoObjectId(userId, 'userId')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {
        const isDescriptionChanged = await changeTaskDescription(taskId, newDescription, userId)
        if (isDescriptionChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Description changed successfully.',
                updatedTask: isDescriptionChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/change-position', async (req, res, next) => {
    let userId = req.user.id
    let { boardId, taskId } = req.params
    let inStatusGroup = req.query?.inStatusGroup
    let desiredPosition = req.query?.desiredPosition || 1

    if (typeof (desiredPosition) === String) desiredPosition = parseInt(desiredPosition)
    if (desiredPosition === 0) desiredPosition = 1

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!inStatusGroup) throw new AppError("Not get `inStatusGroup` in query.", 400)
    if (!['Todo', 'In Progress', 'Done'].includes(inStatusGroup)) throw new AppError("`inStatusGroup` can be only 'Todo', 'In Progress', 'Done'.", 400)
    if (!desiredPosition) throw new AppError("Not get `desiredPosition` in query.", 400)
    if (desiredPosition === NaN) throw new AppError("`desiredPosition` only can be number.", 400)

    userId = toMongoObjectId(userId, 'userId')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)

    try {
        const isPositionChanged = await changeTaskPosition(boardId ,taskId, inStatusGroup, desiredPosition, userId)
        if (isPositionChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Description changed successfully.',
                updatedTask: isPositionChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/assign-to', async (req, res, next) => {
    let assignBy = req.user.id
    let { boardId, taskId } = req.params
    let assignTo = req.query?.assignTo

    if (!taskId) throw new AppError('Not get `taskId` in query.', 400)
    if (!boardId) throw new AppError('Not get `boardId` as path parameter.', 400)
    if (!assignTo) throw new AppError("Not get `assignTo` in query.", 400)
    if (assignTo.length !== 24) throw new AppError("assignTo can't be less or greater then 24 character in `assignTo` query parameter.")

    assignBy = toMongoObjectId(assignBy, 'assignBy')
    taskId = toMongoObjectId(taskId, 'taskId')
    boardId = toMongoObjectId(boardId, 'boardId')
    assignTo = toMongoObjectId(assignTo, 'assignTo')

    const taskExistInBoard = await isThisTaskExistInBoard(taskId, boardId)
    if (!taskExistInBoard) throw new AppError(`This task(${taskId}) is not part of board(${boardId})`, 404)
    const isNewAssignToUserIsMemberOfBoard = await checkBoardMembershipByUserId(boardId, assignTo)
    if (!isNewAssignToUserIsMemberOfBoard) throw new AppError(`This user(${assignTo}) is not member of this board.`)

    try {
        const isAssignedToChanged = await changeTaskAssignedTo(taskId, assignTo, assignBy)
        if (isAssignedToChanged) {
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: `Task(${taskId}) assigned to user(${assignTo})`,
                updatedTask: isAssignedToChanged
            })
        }
        res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'No changes applied.'
        })
    } catch (error) {
        next(error)
    }
})

export default router