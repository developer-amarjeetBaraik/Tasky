import express from 'express'
import taskRouter from './taskRoute.js'
import AppError from '../errors/appError.js'
import toMongoObjectId from '../utils/toMongoObjectId.js'
import authenticateBoardMembership from '../middlewares/authenticateBoardMembership.js'
import DevError from '../errors/devError.js'
import { checkBoardMembershipByUserId, checkIfBoardAdminByUserId, createBoard, deleteBoard, getAllBoardsByUserId, grantBoardMembershipByUserId, removeUserFromBoard } from '../DBQuery/boardDbQuary.js'

const router = express.Router({ mergeParams: true })

const testBoardId = process.env.TEST_BOARD_ID

router.get('/all-boards', async (req, res, next) => {
    let userId = req.user?._id
    if (!userId) throw new DevError("Something went wrong with userId parsing.")
    userId = toMongoObjectId(userId)

    try {
        const boards = await getAllBoardsByUserId(userId)
        if(!boards){
            return res.status(200).json({
                statusCode:200,
                success:true,
                message:`There is no board for userId(${userId}), create your first board.`,
                boards:[]
            })
        }
        res.status(200).json({
            statusCode:200,
            success:true,
            message:`These are your boards.`,
            boards
        })
    } catch (error) {
        next(error)
    }
})

/* This code snippet defines a POST route `/create-board` that handles the creation of a new board.
Here's a breakdown of what the code is doing: */
router.post('/create-board', async (req, res, next) => {
    const { name, description } = req.body
    let userId = req.user?._id
    if (!name || name?.length < 5) throw new AppError("name can't be undefined and it's length must be greater than 5 characters.")
    if (!description || description?.length < 5) throw new AppError("description can't be undefined and it's length must be greater than 10 characters.")
    if (!userId) throw new DevError("Something went wrong with userId parsing.")
    userId = toMongoObjectId(userId)

    try {
        const newBoard = await createBoard(name, description, userId)
        if (!newBoard) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: "Failed to create board."
            })
        }
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: `Successfully created a new board with boardId: ${newBoard?._id}.`,
            newBoard
        })
    } catch (error) {
        next(error)
    }
})

const boardEventWithAuthRouter = express.Router({ mergeParams: true })

/* The `boardEventWithAuthRouter.delete('/delete-board', async (req, res, next) => { ... }` code
snippet defines a DELETE route `/delete-board` that handles the deletion of a board. Here's a
breakdown of what the code is doing: */
boardEventWithAuthRouter.delete('/delete-board', async (req, res, next) => {
    let boardId = req.params?.boardId
    let userId = req.user?._id
    if (!boardId || boardId?.length !== 24) throw new AppError("boardId can't be undefined and it can be only of lenght 24 characters.")
    if (!userId || userId?.length !== 24) throw new DevError("userId can't be undefined and it can be only of lenght 24 characters.")
    boardId = toMongoObjectId(boardId)
    userId = toMongoObjectId(userId)

    try {
        const isAdmin = await checkIfBoardAdminByUserId(boardId, userId)
        if (!isAdmin) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: `You are unauthorised to delete this board(${boardId}) because you are not admin of it.`
            })
        }
        const isDeleted = await deleteBoard(boardId, userId)
        if (!isDeleted) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: `Failed to delete this board(${boardId}).`
            })
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: `Board(${boardId}) deleted successfully.`
        })
    } catch (error) {
        next(error)
    }
})

/* The `boardEventWithAuthRouter.patch('/add-user', async (req, res, next) => { ... }` route is
responsible for handling the action of adding a user to a board. Here's a breakdown of what the code
is doing: */
boardEventWithAuthRouter.patch('/add-user', async (req, res, next) => {
    let boardId = req.params?.boardId
    let userId = req.user?._id
    let add_to = req.query?.add_to
    if (!boardId || boardId?.length !== 24) throw new AppError("boardId can't be undefined and it can be only of lenght 24 characters.")
    if (!userId || userId?.length !== 24) throw new AppError("userId can't be undefined and it can be only of lenght 24 characters.")
    if (!add_to || add_to?.length !== 24) throw new AppError("add_to can't be undefined and it can be only of lenght 24 characters.")
    boardId = toMongoObjectId(boardId)
    userId = toMongoObjectId(userId)
    add_to = toMongoObjectId(add_to)

    try {
        const isAdmin = await checkIfBoardAdminByUserId(boardId, userId)
        if (!isAdmin) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: `Only admin of this board can add users. You are not admin!`
            })
        }

        const alreadyAdded = await checkBoardMembershipByUserId(boardId, add_to)
        if (alreadyAdded) {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: `User(${add_to}) already exist in this board board(${boardId})`
            })
        }

        const isAdded = await grantBoardMembershipByUserId(boardId, add_to)
        if (!isAdded) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: `Failed to add user(${add_to}) in this board(${boardId}).`
            })
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: `User(${add_to}) added successfully.`,
            updated_board: isAdded
        })
    } catch (error) {
        next(error)
    }
})

/* The `boardEventWithAuthRouter.patch('/remove-board-user', async (req, res, next) => { ... }` route
is responsible for handling the action of removing a user from a board. Here's a breakdown of what
the code is doing: */
boardEventWithAuthRouter.patch('/remove-board-user', async (req, res, next) => {
    let boardId = req.params?.boardId
    let userId = req.user?._id
    let remove_to = req.query?.remove_to
    if (!boardId || boardId?.length !== 24) throw new AppError("boardId can't be undefined and it can be only of lenght 24 characters.")
    if (!userId || userId?.length !== 24) throw new AppError("userId can't be undefined and it can be only of lenght 24 characters.")
    if (!remove_to || remove_to?.length !== 24) throw new AppError("remove_to can't be undefined and it can be only of lenght 24 characters.")
    boardId = toMongoObjectId(boardId)
    userId = toMongoObjectId(userId)
    remove_to = toMongoObjectId(remove_to)

    try {
        const isAdmin = await checkIfBoardAdminByUserId(boardId, userId)
        if (!isAdmin) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: `Only admin of this board can remove users. You are not admin!`
            })
        }

        if (isAdmin && userId === remove_to) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: `You can't remove yourself like this, use leave board feature instead.`
            })
        }
        const isExist = await checkBoardMembershipByUserId(boardId, remove_to)
        if (!isExist) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: `User(${remove_to}) not exist in this board.`
            })
        }
        const isRemoved = await removeUserFromBoard(boardId, remove_to)
        if (!isRemoved) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: `Failed to remove user(${remove_to}) from this board(${boardId}).`
            })
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: `User(${remove_to}) removed successfully from this baord(${boardId}).`,
            updated_board: isRemoved
        })
    } catch (error) {
        next(error)
    }
})

/* The `boardEventWithAuthRouter.patch('/leave-board', async (req, res, next) => { ... }` code snippet
defines a PATCH route `/leave-board` within the `boardEventWithAuthRouter` router. This route is
responsible for handling the action of a user leaving a board. */
boardEventWithAuthRouter.patch('/leave-board', async (req, res, next) => {
    let boardId = req.params?.boardId
    let userId = req.user?._id
    if (!boardId || boardId?.length !== 24) throw new AppError("boardId can't be undefined and it can be only of lenght 24 characters.")
    if (!userId || userId?.length !== 24) throw new AppError("userId can't be undefined and it can be only of lenght 24 characters.")
    boardId = toMongoObjectId(boardId)
    userId = toMongoObjectId(userId)

    try {
        const isRemoved = await removeUserFromBoard(boardId, userId)
        if (!isRemoved) {
            return res.status(500).json({
                statusCode: 500,
                success: false,
                message: `Failed to leave board(${boardId}).`
            })
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: `Leaved baord(${boardId}) successfully.`,
        })
    } catch (error) {
        next(error)
    }
})

router.use('/:boardId', authenticateBoardMembership, boardEventWithAuthRouter)
router.use('/:boardId/task/', authenticateBoardMembership, taskRouter)

export default router