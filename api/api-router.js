const router = require('express').Router()
const restricted = require('../auth/restricted')

// Define Routes
const authRouter = require('../auth/auth-router')
const userRouter = require('../user/user-router')

// Use Routes
router.use('/auth', authRouter)
router.use('/user', restricted, userRouter)

router.get('/', (req, res) => {
    res.json({ api: 'running' })
})

module.exports = router