import express from 'express'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT

app.get('/',(req, res)=>{
    res.send({message:'Hello there.'})
})

app.listen(PORT, ()=>{
    console.log(`Your app is running on PORT: ${PORT}`)
})