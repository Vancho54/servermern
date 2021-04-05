const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } )
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'User dont exist' })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(400).json({ msg:'Incorrect password' })
        }

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
    }
}

exports.authedUser = async ( req, res ) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Error'})
    }
}