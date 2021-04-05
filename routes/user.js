const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { check } = require('express-validator')

router.post('/', 
    [
        check('name', 'A name is required').not().isEmpty(),
        check('email', 'Please type a valid Email').isEmail(),
        check('password', 'The password is too shor').isLength({min: 6})
    ],
    userController.createUser
)

module.exports = router