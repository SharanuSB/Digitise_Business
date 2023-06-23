const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const usersController = {}

usersController.register = async(req, res)=>{
    try {
        const body = req.body
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(userObj.password, salt)
        userObj.password = hash
        const user = await userObj.save()
        if(user){
            res.json(user)
        }else{
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

usersController.login = async(req, res)=>{
    try {
        const body = req.body
        const userObj = await User.findOne({email:body.email})
        if(userObj){
            const match = await bcrypt.compare(body.password, userObj.password)
            if(match){
                const tokenData = {
                    id:userObj._id,
                    role:userObj.role
                }
                const token =jwt.sign(tokenData, process.env.JWT_SECRET)
                if(token){
                    res.json(token)
                }else{
                    res.json({
                        error:"No Token Found"
                    })
                }
            }else{
                res.json({
                    error:"Invalid Email or Password"
                })
            }
        }else{
            res.json({
                error:"Invalid Email or Password"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = usersController