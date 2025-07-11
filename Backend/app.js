import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import userAuth from './routes/userAuth.js'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

await mongoose.connect(process.env.MONGO_URL)
    .then(res => console.log('Database connected'))
    .catch(err => console.log(err))

// routes
app.use('/auth', userAuth)

app.get('/', (req, res) => {
    res.send({ message: 'Hello there.' })
})

app.listen(PORT, () => {
    console.log(`Your app is running on PORT: ${PORT}`)
})