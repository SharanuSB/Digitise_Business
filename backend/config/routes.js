const express = require("express")
const usersController = require("../app/controllers/usersController")

const router = express.Router()

/// Api's For User Model -------
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)


module.exports = router