const express = require("express")
const usersController = require("../app/controllers/usersController")
const userAuthentication = require("../app/middlewares/userAuthentication")
const categoryController = require("../app/controllers/categoryController")

const shopsController = require("../app/controllers/shopsController")
const authorizeUser = require("../app/middlewares/authorizeUser")
const productsController = require("../app/controllers/productsController")
const authorizeOwner = require("../app/middlewares/authorizeOwner")


const router = express.Router()

/// Api's For User Model -------
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)
router.put("/api/users/update", userAuthentication, usersController.update)

/// Api's For Category Model ------
router.post("/api/categories/create/:id", userAuthentication, (req, res, next) => {
    req.permittedRoles = ['shopOwner']
    next()
},authorizeOwner, categoryController.create)


/// Api's For Shop Model
router.get("/api/shops", shopsController.list)

router.post("/api/shops", userAuthentication, (req,res, next)=>{
    req.permittedRoles = ["shopOwner"]
    next()
},authorizeUser, shopsController.create)

router.put("/api/shops/:id", userAuthentication, (req,res, next)=>{
    req.permittedRoles = ["shopOwner"]
    next()
},authorizeUser, shopsController.update)

router.delete("/api/shops/:id", userAuthentication, (req,res, next)=>{
    req.permittedRoles = ["shopOwner"]
    next()
},authorizeUser, shopsController.destroy)


/// Api's for Products Model --------

router.get("/api/products/listAll/:id", productsController.listAll)

router.post("/api/products/create/:id" ,userAuthentication, (req,res, next)=>{
    req.permittedRoles = ["shopOwner"]
    next()
},authorizeUser,authorizeOwner, productsController.create)

module.exports = router