const express = require("express")
const usersController = require("../app/controllers/usersController")
const userAuthentication = require("../app/middlewares/userAuthentication")
const shopsController = require("../app/controllers/shopsController")
const authorizeUser = require("../app/middlewares/authorizeUser")

const router = express.Router()

/// Api's For User Model -------
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)
router.put("/api/users/update", userAuthentication, usersController.update)

/// Api's For Shop Model
router.get("/api/shops", userAuthentication, (req,res, next)=>{
    req.permittedRoles = ['superAdmin', "shopOwner"]
    next()
},authorizeUser, shopsController.list)

router.post("/api/shops", userAuthentication, (req,res, next)=>{
    req.permittedRoles = ["shopOwner"]
    next()
},authorizeUser, shopsController.create)


module.exports = router