import { checkBoardMembershipByUserId } from "../DBQuery/boardDbQuary.js"
import DevError from "../errors/devError.js"
import toMongoObjectId from "../utils/toMongoObjectId.js"

const authenticateBoardMembership = async (req, res, next)=>{
    let { boardId } = req.params
    let userId = req.user?.id

    boardId = toMongoObjectId(boardId, 'boardId')
    userId = toMongoObjectId(userId,'userId')

    if(!userId || !boardId){
        return res.status(500).json({
            statusCode:500,
            message:'Something went wrong.'
        })
    }
    try {
        const isMember = await checkBoardMembershipByUserId(boardId, userId)
        if(!isMember){
            return res.status(401).json({
                statusCode:401,
                message:`You are unauthorised for this board(${boardId})`
            })
        }
        next()
    } catch (error) {
        throw new DevError(error)
    }
}

export default authenticateBoardMembership