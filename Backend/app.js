import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import errorHandler from './middlewares/errorHandler.js'
import userAuthRoute from './routes/userAuthRoute.js'
import boardRouter from './routes/boardRoute.js'
import authenticate from './middlewares/authenticate.js'
import authenticateBoardMembership from './middlewares/authenticateBoardMembership.js'

const app = express()
const server = createServer(app)
export const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
})
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

await mongoose.connect(process.env.MONGO_URL)
    .then(res => console.log('Database connected'))
    .catch(err => console.log(err))

// routes
app.use('/auth', userAuthRoute)
app.use('/board', authenticate, boardRouter)

app.get('/', (req, res) => {
    res.send({ message: 'Hello there.' })
})

app.use(errorHandler)
server.listen(PORT, () => {
    console.log(`Your app is running on PORT: ${PORT}`)
})