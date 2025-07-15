import DevError from "../errors/devError.js"
import { verifyAuthToken } from "../helper/jwtAuthTokenHelper.js"

const authenticate = (req, res, next)=>{
    const authToken = req.cookies.authToken
    if(!authToken){
        return res.status(400).json({
            statusCode:400,
            message:'Bad request. auth token is missing.'
        })
    }
    try {
        const authenticated = verifyAuthToken(authToken)
        if(authenticated){
            req.user = authenticated
            next()
        }else{
            res.status(401).json({
                statusCode:401,
                message:'Invalid auth token.'
            })
        }
    } catch (error) {
        throw new DevError(error)
    }
}

export default authenticate