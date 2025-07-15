import express from 'express'
import 'dotenv/config'
import { signupUser, loginUser } from '../services/userAuthFn.js';
import { generateAuthToken } from '../helper/jwtAuthTokenHelper.js';
import DevError from '../errors/devError.js';
const router = express.Router()

const tokenExpiresInOneYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

router.post('/sign-up', async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password || name.length < 3 || email.length < 11 || password.length < 5) {
        return res.status(422).json({
            status: 422,
            message: 'Name, email, or password are missing or inappropriate.'
        });
    }

    try {
        const newUser = await signupUser(name, email, password)

        // if signup fails
        if (!newUser) return
        const authToken = await generateAuthToken({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        })
        if (!authToken) {
            return res.status(207).json({
                status: 207,
                message: 'Ragistered successfully. Go to Login page to login.'
            })
        }
        res.cookie('authToken', authToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: tokenExpiresInOneYear
        }).status(200).json({
            status: 200,
            message: `Sign up successfully for email: ${newUser.email}`
        })
    } catch (error) {
        next(error)
    }
})

router.get('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password || email.length < 11 || password.length < 5) {
        return res.status(422).json({
            status: 422,
            message: 'email, or password are missing or inappropriate.'
        });
    }

    try {
        const user = await loginUser(res, email, password)
        // if so user by any reason
        if (!user) return
        const authToken = await generateAuthToken({
            id: user._id,
            name: user.name,
            email: user.email
        })
        if(!authToken) throw new Error('Something went wrong while generating auth token')
        res.cookie('authToken', authToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: tokenExpiresInOneYear
        }).status(200).json({
            status: 200,
            message: `Logged in successfully email: ${user.email}`
        })
    } catch (error) {
        throw new DevError(error)
    }

})
export default router 