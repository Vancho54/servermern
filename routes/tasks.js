const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


router.post('/',
    auth,
    [
        check('name', 'A name is required').not().isEmpty()
    ],
    tasksController.createTask
)

router.get('/',
    auth,
    tasksController.getTasks
)

router.put('/:id',
    auth,
    tasksController.updateTask
)

router.delete('/:id',
    auth,
    tasksController.deleteTask
)

module.exports = router