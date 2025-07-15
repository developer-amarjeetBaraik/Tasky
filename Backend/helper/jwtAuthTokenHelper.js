import jwt from 'jsonwebtoken'
import 'dotenv/config'
import DevError from '../errors/devError.js'

const authTokenSecret = process.env.AUTH_TOKEN_SECRET

/**
 * Generates an authentication token using the provided data object and a secret key.
 * @param {Object} dataObj - The data object to be encoded into the token.
 * @returns {string|boolean} The generated authentication token if successful, false otherwise.
 */
export const generateAuthToken = (dataObj) => {
    try {
        if(!dataObj) throw new Error("dataObj arrgument can't be undefined.")
        const authToken = jwt.sign(dataObj, authTokenSecret)
        return authToken
    } catch (error) {
        throw new DevError(error)
    }
}

export const verifyAuthToken = (authToken) =>{
    try {
        if(!authToken) throw Error("authToken arrgument can't be undefined.")
        const user = jwt.verify(authToken, authTokenSecret)
        return user
    } catch (error) {
        throw new DevError(error)
    }
}