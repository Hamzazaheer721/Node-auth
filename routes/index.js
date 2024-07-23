const express = require("express")
const { userLogin, userRegister } = require("../controllers/userController")
const {
  userRegistrationValidate,
  userLoginValidate
} = require("../utils/userValidations")
const ensureAuthenticated = require("../utils/auth")

const routes = express.Router()

routes.post("/login", userLoginValidate, userLogin)

routes.post("/register", userRegistrationValidate, userRegister)

routes.get("/users", ensureAuthenticated)

module.exports = routes
