const { Router } = require('express')
const { User } = require('../db/index')
const jwt = require('jsonwebtoken');

const route = Router()

route.post('/register', async (req,res) => {
    const user = req.body.user
    try {
        const newUser = await User.create(user)
        res.status(201).json({
            user: newUser.getRegistrationResponse()
        })
    } catch(e) {
        console.log(e);
        res.status(409).json(e)
    }
})

route.post('/login', async (req,res) => {
    
    try {
        const user = await User.findOne({
            where: {
                email: req.body.user.email,
                password: req.body.user.password
            }})
        const token = jwt.sign({id: user.id},'qwerty')
        const loginResponse = {
            email: user.email,
            username: user.username,
            token: token
        }
        res.status(200).json(loginResponse)
    } catch(e) {
        res.status(400).json({
            error: "email or password incorrect!!"
        })
    }
    
})

module.exports = route