const express = require("express")
const usersController = require("../app/controllers/usersController")
const userAuthentication = require("../app/middlewares/userAuthentication")

const router = express.Router()

/// Api's For User Model -------
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)
router.put("/api/users/update", userAuthentication, usersController.update)


module.exports = router