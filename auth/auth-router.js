const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../user/user-model')
const { validateUser } = require('../user/user-helpers')

// REGISTER
router.post('/register', (req, res) => {
    let user = req.body

    // Validate
    const validateResult = validateUser(user)

    if(validateResult.isSuccessful === true){
        const hash = bcrypt.hashSync(user.password, 12)
        user.password = hash

        User.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .then(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(400).json({
            message: "invalid information about user",
            errors: validateResult.errors
        })
    }
})

// LOGIN
router.post('/login', (req, res) => {
    let { username, password } = req.body

    User.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            // Produce Token
            const token = getJwtToken(user.username)
            // Send token to client
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token // return token
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// LOGOUT
router.get('/logout', (req, res) => {
    if(req.token){
        req.token.destroy(err => {
            if(err){
                res.status(500).json({ message: "Failed to logout"})
            } else {
                res.status(200).json({ message: "You have successfully logged out"})
            }
        })
    } else {
        res.status(200).json({ message: "You have successfully logged out"})
    }
})

// JWT TOKEN
function getJwtToken(username){
    //make sure no one modifies token
    const payload = {
      username,
      role: 'user'
    }
  
    const secret = process.env.JWT_SECRET || 'is it secret?'
    const options = {
      expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options)
  }

  module.exports = router