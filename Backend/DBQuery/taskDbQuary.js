import mongoose from "mongoose"
import AppError from "../errors/appError.js"
import DevError from "../errors/devError.js"
import Task from "../models/taskSchema.js"
import getPositionForTaskInItsStatusGroup from "./utilsDbQuray/getPositionForTaskInItsStatusGroup.js"
import isTaskTitleDuplicateInBoard from "./utilsDbQuray/isTaskTitleDuplicateInBoard.js"
import leastTaskUserInBoard from "./utilsDbQuray/leastTaskUserInBoard.js"

export const createTask = async (boardId, userId, title, description, priority, status) => {
    const isDuplicateTitle = await isTaskTitleDuplicateInBoard(title, boardId)
    if (isDuplicateTitle) throw new AppError(`Duplicate title. '${title}' titled task already exist in this board.`, 409)

    try {
        let newTask = new Task({
            title: title,
            description: description,
            createdBy: userId,
            lastEditedBy: userId,
            boardId: boardId,
            assignedTo: await leastTaskUserInBoard(boardId) || userId,
            position: await getPositionForTaskInItsStatusGroup(status, boardId, 0),
            priority: priority,
            status: status,
        })
        newTask = await newTask.save()
        return newTask
    } catch (error) {
        throw new DevError(error)
    }
}

export const findTaskByTaskId = async (taskId) => {
    if (!taskId) throw new DevError("taskId can't be undefined.")
    try {
        const task = await Task.findById(taskId)
        return task
    } catch (error) {
        throw new DevError(error)
    }
}

export const getTasksByBoardId = async (boardId) => {
    if (!boardId) throw new DevError("boardId can't be undefined.")

    try {
        const grouped = await Task.aggregate([
            { $match: { boardId: boardId } },
            { $sort: { position: 1 } },
            {
                $group: {
                    _id: "$status",
                    tasks: { $push: "$$ROOT" }
                }
            }
        ]);

        const groupedObj = {};
        grouped.forEach(group => {
            groupedObj[group._id] = group.tasks;
        });

        return groupedObj
    } catch (error) {
        throw new DevError(error)
    }
}

export const deleteTask = async (taskId) => {
    if (!taskId) throw new DevError("`taskId` can't be null or undefined.")
    try {
        const isDeleted = await Task.findByIdAndDelete(taskId)
        return isDeleted
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskStatus = async (taskId, newStatus, changeBy) => {
    if (!taskId, !newStatus) throw new DevError("taskId and newStatus can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    try {
        const isStatusChanged = await Task.findByIdAndUpdate(taskId, { status: newStatus, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })
        if (isStatusChanged.status === newStatus) {
            return isStatusChanged
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskPriority = async (taskId, newPriority, changeBy) => {
    if (!taskId, !newPriority) throw new DevError("taskId and newPriority can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    try {
        const isPriorityChanged = await Task.findByIdAndUpdate(taskId, { priority: newPriority, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })
        if (isPriorityChanged.priority === newPriority) {
            return isPriorityChanged
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskTitle = async (taskId, newTitle, changeBy) => {
    if (!taskId, !newTitle) throw new DevError("taskId and newTitle can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    try {
        const isTitleChanged = await Task.findByIdAndUpdate(taskId, { title: newTitle, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })
        if (isTitleChanged.title === newTitle) {
            return isTitleChanged
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskDescription = async (taskId, newDescription, changeBy) => {
    if (!taskId, !newDescription) throw new DevError("taskId and newDescription can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    try {
        const isDescriptionChanged = await Task.findByIdAndUpdate(taskId, { description: newDescription, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })
        if (isDescriptionChanged.description === newDescription) {
            return isDescriptionChanged
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskAssignedTo = async (taskId, newAssignedTo, changeBy) => {
    if (!taskId, !newAssignedTo) throw new DevError("taskId and newAssignedTo can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    try {
        const isAssignedToChanged = await Task.findByIdAndUpdate(taskId, { assignedTo: newAssignedTo, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })

        if (isAssignedToChanged.assignedTo.equals(newAssignedTo)) {
            return isAssignedToChanged
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export const changeTaskPosition = async (boardId, taskId, inStatusGroup, desiredPosition, changeBy) => {
    if (!taskId, !inStatusGroup) throw new DevError("taskId and inStatusGroup can't be null or undefined.")
    if (!changeBy) throw new DevError("changeBy can't be null or undefined.")

    const session = await mongoose.startSession()

    try {
        await session.startTransaction()
        const newPosition = await getPositionForTaskInItsStatusGroup(inStatusGroup, boardId, desiredPosition, { session })
        const isPositionChanged = await Task.findByIdAndUpdate(taskId, { position: newPosition, lastEditedBy: changeBy, updatedAt: Date.now() }, { new: true })
        if (isPositionChanged.position === newPosition) {
            await session.commitTransaction()
            return isPositionChanged
        }
        await session.abortTransaction()
        return false
    } catch (error) {
        await session.abortTransaction()
        throw new DevError(error)
    } finally {
        await session.endSession()
    }
}