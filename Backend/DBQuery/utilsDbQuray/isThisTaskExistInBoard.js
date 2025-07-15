import AppError from "../../errors/appError.js"
import DevError from "../../errors/devError.js"
import Task from "../../models/taskSchema.js"

const isThisTaskExistInBoard = async (taskId, boardId) => {
    if (!taskId || !boardId) throw DevError("`taskId` and `boardId` can't be undefined or null.")
    try {
        let taskExistInBoard = await Task.countDocuments({ _id: taskId, boardId: boardId })
        if(taskExistInBoard > 0){
            return true
        }
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

export default isThisTaskExistInBoard