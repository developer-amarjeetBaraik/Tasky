import DevError from "../errors/devError.js"
import Board from "../models/boardSchema.js"


/**
 * The function `checkIfBoardAdminByUserId` checks if a user owns a board based on the board ID and
 * user ID.
 * @param boardId - The `boardId` parameter is the unique identifier of a board in the database. It is
 * used to identify a specific board that you want to check ownership for.
 * @param userId - The `userId` parameter represents the unique identifier of the user whose ownership
 * of a specific board is being checked.
 * @returns The function `checkIfBoardAdminByUserId` returns a boolean value - `true` if the user
 * with the specified `userId` is an admin of the board with the specified `boardId`, and `false`
 * otherwise.
 */
export const checkIfBoardAdminByUserId = async (boardId, userId) => {
    if (!boardId || !userId) throw new DevError("BoardId or userId can't be undefined.")
    try {
        const board = await Board.findOne({ _id: boardId, admins: userId }).select('admins -_id')
        if (board?.admins.includes(userId)) return true
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * The function `checkBoardMembershipByUserId` checks if a user is a member of a board based on their
 * user ID and board ID.
 * @param boardId - The `boardId` parameter is the unique identifier of the board for which you want to
 * check membership. It is used to identify a specific board in the database.
 * @param userId - The `userId` parameter is the unique identifier of the user whose membership on a
 * specific board needs to be checked.
 * @returns The function `checkBoardMembershipByUserId` returns a boolean value - `true` if the user
 * with the given `userId` has edit permissions for the board with the specified `boardId`, and `false`
 * otherwise.
 */
export const checkBoardMembershipByUserId = async (boardId, userId) => {
    if (!boardId || !userId) throw new DevError("BoardId or userId can't be undefined.")
    try {
        const board = await Board.findOne({ _id: boardId, canEdit: userId }).select('canEdit -_id')
        if (board?.canEdit.includes(userId)) return true
        return false
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * The function `grantBoardMembershipByUserId` adds a user to the list of users who can edit a specific
 * board in a MongoDB database.
 * @param boardId - The `boardId` parameter is the unique identifier of the board to which you want to
 * grant membership. It is used to identify the specific board in the database.
 * @param add_to - The `add_to` parameter in the `grantBoardMembershipByUserId` function represents the
 * user ID that you want to grant board membership to. This user will be added to the `canEdit` array
 * in the specified board document.
 * @returns The function `grantBoardMembershipByUserId` returns the result of adding the `add_to` user
 * to the `canEdit` array in the Board document specified by `boardId`.
 */
export const grantBoardMembershipByUserId = async (boardId, add_to) => {
    if (!boardId, !add_to) throw new DevError("boardId and add_to can't be null or undefined.")
    try {
        let query = Board.findByIdAndUpdate(boardId, { $push: { canEdit: add_to } }, { new: true })
        const added = await query
        return added
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * The function `removeUserFromBoard` removes a user from the `canEdit` and `admins` arrays in a board
 * document in a MongoDB database.
 * @param boardId - The `boardId` parameter is the unique identifier of the board from which you want
 * to remove a user. It is used to identify the specific board in the database.
 * @param remove_to - The `remove_to` parameter in the `removeUserFromBoard` function represents the
 * user that you want to remove from the board. This user will be removed from the `canEdit` and
 * `admins` arrays in the board document in the database.
 * @returns The `removeUserFromBoard` function returns the updated board document after removing the
 * specified user (`remove_to`) from the `canEdit` and `admins` arrays.
 */
export const removeUserFromBoard = async (boardId, remove_to) => {
    if (!boardId, !remove_to) throw new DevError("boardId and remove_to can't be null or undefined.")
    try {
        let query = Board.findByIdAndUpdate(boardId, { $pull: { canEdit: remove_to, admins: remove_to } },{new:true})
        const removed = await query
        return removed
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * This function adds a user to the list of users who can edit a specific board in a MongoDB database.
 * @param boardId - The `boardId` parameter is the unique identifier of the board where you want to add
 * a user to the list of users who can edit the board.
 * @param userId - The `userId` parameter in the `addUserInCanEditInBoard` function represents the
 * unique identifier of the user that you want to add to the list of users who can edit a specific
 * board.
 * @param [options] - The `options` parameter in the `addUserInCanEditInBoard` function is an optional
 * object that can contain additional settings or configurations for the operation. It allows for
 * customization of the behavior of the function. In this specific function, the `options` parameter is
 * used to pass a `session
 * @returns The function `addUserInCanEditInBoard` is returning the result of adding the `userId` to
 * the `canEdit` array in the board document specified by `boardId`. The function returns the updated
 * board document after the user has been added to the `canEdit` array.
 */
export const addUserInCanEditInBoard = async (boardId, userId, options = {}) => {
    if (!boardId || !userId) throw new DevError("BoardId or userId can't be undefined.")
    try {
        let query = Board.findByIdAndUpdate(boardId, { $addToSet: { canEdit: userId } })
        if (options.session) {
            query = query.session(options.session)
        }
        const addedInCanEdit = await query;
        return addedInCanEdit
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * The `createBoard` function creates a new board with the provided name, description, and user ID, and
 * allows for additional options.
 * @param name - The `name` parameter is the name of the board that you want to create.
 * @param description - The `description` parameter in the `createBoard` function is a string that
 * describes the board being created. It provides additional information about the purpose or content
 * of the board.
 * @param userId - The `userId` parameter in the `createBoard` function represents the unique
 * identifier of the user who is creating the board. It is used to set the initial admins, editors, and
 * creator of the board to the user with this specific identifier.
 * @param [options] - The `options` parameter in the `createBoard` function is an optional object that
 * can contain additional configuration settings. In this function, it is used to pass a `session`
 * property that can be used to specify a session for the database operation. This allows for more
 * control over the database transaction and
 * @returns The `createBoard` function returns a newly created board object with the specified name,
 * description, and user ID.
 */
export const createBoard = async (name, description, userId, options = {}) => {
    if (!name || !description || !userId) throw new DevError("name, description, userId can't be null or undefined.")
    try {
        let query = new Board({
            name: name,
            description: description,
            admins: [userId],
            canEdit: [userId],
            createdBy: userId,
        })
        let newBoard;
        if (options.session) {
            newBoard = await query.save({ session: options?.session })
        } else {
            newBoard = await query.save()
        }
        return newBoard
    } catch (error) {
        throw new DevError(error)
    }
}

/**
 * The function `deleteBoard` deletes a board document from the database based on the provided boardId
 * and userId.
 * @param boardId - The `boardId` parameter is the unique identifier of the board that you want to
 * delete.
 * @param userId - The `userId` parameter in the `deleteBoard` function represents the unique
 * identifier of the user who is attempting to delete the board. This parameter is used to ensure that
 * only authorized users can delete a specific board.
 * @param [options] - The `options` parameter in the `deleteBoard` function is an object that allows
 * you to pass additional configuration options to the function. In this case, it is used to provide a
 * session object that can be used for transactions or other database operations. By default, the
 * `options` parameter is an
 */
export const deleteBoard = async (boardId, userId, options = {}) => {
    if (!boardId, !userId) throw new DevError("boardId and userId can't be null or undefined.")
    try {
        let query = Board.findByIdAndDelete(boardId)
        if (options.session) query = query.session(options.session)
        const deleted = await query
        return deleted
    } catch (error) {
        throw new DevError(error)
    }
}