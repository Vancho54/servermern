const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/', 
    [
        check('email', 'Please type a valid Email').isEmail(),
        check('password', 'The password is too shor').isLength({min: 6})
    ],
    authController.authUser
)

router.get('/',
    auth,
    authController.authedUser
)

module.exports = router