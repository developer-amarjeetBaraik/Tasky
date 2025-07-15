import DevError from "../errors/devError.js"
import Board from "../models/boardSchema.js"

export const checkBoardMembershipByUserId = async (boardId, userId) => {
    if (!boardId || !userId) throw new DevError("BoardId or userId can't be undefined.")
    try {
        const board = await Board.findOne({ _id: boardId, canEdit: userId }).select('canEdit -_id')
        return board?.canEdit[0]
    } catch (error) {
        throw new DevError(error)
    }
}

export const addUserInCanEditInBoard = async (boardId, userId,options={}) => {
    if (!boardId || !userId) throw new DevError("BoardId or userId can't be undefined.")
    try {
        let query = Board.findByIdAndUpdate(boardId, {$addToSet: {canEdit: userId} })
        if(options.session){
            query.session(options.session)
        }
        const addedInCanEdit = await query;
        return addedInCanEdit
    } catch (error) {
        throw new DevError(error)
    }
}