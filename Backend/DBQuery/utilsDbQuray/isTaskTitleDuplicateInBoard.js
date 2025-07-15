import AppError from "../../errors/appError.js"
import DevError from "../../errors/devError.js"
import Task from "../../models/taskSchema.js"

const isTaskTitleDuplicateInBoard = async (taskTitle, boardId) => {
    if (!taskTitle || !boardId) throw new DevError("taskTitle and boardId can't be undefined.")
    try {
        const duplicateTask = await Task.find({ boardId: boardId, title: taskTitle })
        if(duplicateTask.length === 0){
            return false
        }
        return true
    } catch (error) {
        throw new DevError(error)
    }
}

export default isTaskTitleDuplicateInBoard