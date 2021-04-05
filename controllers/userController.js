const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } )
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({ email })
        
        if (user) {
            return res.status(400).json({msg: 'Email taken'})
        }

        user = new User(req.body)

        const salt = await bcrypt.genSalt(10)
        
        user.password = await bcrypt.hash(password, salt)
        
        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({token})
        })

    } catch (e) {
        console.log(e)
        res.status(400).send('error')
    }
}