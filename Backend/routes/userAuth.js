import express from 'express'
const router = express.Router()

router.post('/sign-up', (req, res) => {
    res.send({ reqest_email: req.body?.email })
})

export default router