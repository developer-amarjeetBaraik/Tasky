import express from 'express'
import 'dotenv/config'
import { signupUser, loginUser } from '../services/userAuthFn.js';
import { generateAuthToken } from '../helper/jwtAuthTokenHelper.js';
import DevError from '../errors/devError.js';
import authenticate from '../middlewares/authenticate.js';
import AppError from '../errors/appError.js';
const router = express.Router()

const tokenExpiresInOneYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

/* This code snippet defines a GET route in an Express router at the endpoint '/validate-me'. Here's a
breakdown of what the code is doing: */
router.get('/validate-me', authenticate, (req, res, next) => {
    const user = req?.user
    if (!user) throw new AppError('Something went wrong.')
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Valid user',
        user
    })
})

/* This code snippet is defining a POST route for user sign-up in an Express router. Here's a breakdown
of what the code is doing: */
router.post('/sign-up', async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password || name.length < 3 || email.length < 11 || password.length < 5) {
        return res.status(422).json({
            statusCode: 422,
            message: 'Name, email, or password are missing or inappropriate.'
        });
    }

    try {
        const newUser = await signupUser(name, email, password)
        // if user already exist
        if (newUser === "Alredy exist") {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: 'User with this email already exsists. Please login.'
            })
        }

        // if signup fails
        if (!newUser) return
        const authToken = await generateAuthToken({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        })
        if (!authToken) {
            return res.status(207).json({
                statusCode: 207,
                message: 'Ragistered successfully. Go to Login page to login.'
            })
        }
        res.cookie('authToken', authToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: tokenExpiresInOneYear
        }).status(201).json({
            statusCode: 201,
            success: true,
            message: `Sign up successfully for email: ${newUser.email}`,
            user: newUser,
            redirect: '/dashboard'
        })
    } catch (error) {
        next(error)
    }
})

/* This code snippet defines a POST route for user login in an Express router. Here's a breakdown of
what the code is doing: */
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password || email.length < 11 || password.length < 5) {
        return res.status(422).json({
            statusCode: 422,
            message: 'email, or password are missing or inappropriate.'
        });
    }

    try {
        const user = await loginUser(res, email, password)
        //if user null || user in not in our system
        if (user === null) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "This email is not exist in our system. Please sign-up first."
            })
        }
        // if user false || password not matched
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Invalid password."
            })
        }
        const authToken = await generateAuthToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        })
        if (!authToken) throw new Error('Something went wrong while generating auth token')
        res.cookie('authToken', authToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: tokenExpiresInOneYear
        }).status(200).json({
            statusCode: 200,
            success: true,
            message: `Logged in successfully email: ${user.email}`,
            user,
            redirect: '/dashboard'
        })
    } catch (error) {
        throw new DevError(error)
    }

})

/* This code snippet defines a GET route in an Express router at the endpoint '/logout'. When a user
accesses this endpoint, it triggers a logout action. Here's a breakdown of what the code is doing: */
router.get('/logout', (req, res, next) => {
    const authToken = req.cookies?.authToken
    if (!authToken) return res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Already loggedout.'
    })
    try {
        res.status(200).clearCookie('authToken').json({
            statusCode: 200,
            success: true,
            message: 'Logout successfully.'
        })
    } catch (error) {
        next(error)
    }
})
export default router 