const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectsController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post('/',
    auth,
    [
        check('name', 'The name is required').not().isEmpty()
    ],
    projectController.createProject
)

router.get('/',
    auth,
    projectController.getProjects
)

router.put('/:id',
    auth,
    [
        check('name', 'The name is required').not().isEmpty()
    ],
    projectController.updateProject
)

router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router