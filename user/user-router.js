const router = require('express').Router()
const User = require('./user-model')

// Check Roles

// GET
router.get('/', (req, res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => console.log(err))
})

// GET by ID
router.get('/:id', (req, res) => {
    const {id} = req.params

    User.findById(id)
    .then(user => {
        if(user){
            res.json(user)
        } else {
            res.status(404).json({ message: 'No User found with that ID'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get User' })
    })
})

// PUT

// DELETE

module.exports = router