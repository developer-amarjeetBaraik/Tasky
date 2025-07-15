import DevError from "../../errors/devError.js"
import Task from "../../models/taskSchema.js"

const leastTaskUserInBoard = async (boardId) => {
    if (!boardId) throw new DevError("boardId can't be undefined.")

    try {
        const user = await Task.aggregate([
            {
                $match: { boardId: boardId }
            },
            {
                $group: { _id: "$assignedTo", taskCount: { $sum: 1 } }
            },
            {
                $sort: { taskCount: 1 }
            },
            {
                $limit: 1
            }
        ])
        return user[0]?._id
    } catch (error) {
        throw new DevError(error)
    }
}

export default leastTaskUserInBoard