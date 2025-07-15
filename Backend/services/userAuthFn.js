import mongoose from "mongoose"
import { findUserByEmail } from "../DBQuery/userDbQuary.js"
import AppError from "../errors/appError.js"
import DevError from "../errors/devError.js"
import { HashPassword, matchPassword } from "../helper/bcryptHelper.js"
import User from "../models/userSchema.js"
import Board from "../models/boardSchema.js"
import { addUserInCanEditInBoard } from "../DBQuery/boardDbQuary.js"
import toMongoObjectId from "../utils/toMongoObjectId.js"


const defaultBoardId = toMongoObjectId(process.env.TEST_BOARD_ID)

/**
 * Sign up a new user with the provided name, email, and password.
 * @param {Response} res - The response object to send back to the client.
 * @param {string} name - The name of the user to sign up.
 * @param {string} email - The email of the user to sign up.
 * @param {string} password - The password of the user to sign up.
 * @returns {Promise<User | boolean>} A promise that resolves to the newly signed up user or false if an error occurs.
 */
export const signupUser = async (name, email, password) => {
    if (!name || !email || !password) throw new DevError("name, email, password can't be undefined")
    const session = await mongoose.startSession()
    try {
        // Check if the user already exsist
        const alreadyExist = await findUserByEmail(email)
        if (alreadyExist) {
            throw new AppError("User with this email already exsists. Please login.", 403)
        }
        // Hash the plain password
        const hashedPassword = await HashPassword(password)
        await session.startTransaction()
        // create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        // save new user in DB
        const newUser = await user.save({ session })

        // adding user in default test board
        const addedUserInDefaultBoard = await addUserInCanEditInBoard(defaultBoardId, newUser._id, { session })
        if(!addedUserInDefaultBoard) await session.abortTransaction()
        await session.commitTransaction()
        return newUser
    } catch (error) {
        await session.abortTransaction()
        throw new DevError(error)
    } finally {
        await session.endSession()
    }
}

export const loginUser = async (res, email, password) => {
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            throw new AppError("This email is not exist in our system. Please sign-up first.", 401)
        }
        const isMatched = await matchPassword(password, user.password)
        if (!isMatched) {
            throw new AppError('Incorrect email or password', 401)
        }
        return user
    } catch (error) {
        throw new DevError(error)
    }
} 