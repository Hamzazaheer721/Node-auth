const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(500).json({ message: "User not found!" })
    }
    const isPassEqual = await bcrypt.compare(req.body.password, user.password)

    if (!isPassEqual) {
      return res.status(500).json({ message: "Invalid Password!" })
    }

    const tokenObject = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email
    }

    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "4h"
    })

    return res.status(200).json({ jwtToken, tokenObject })
  } catch (error) {
    res.status(500).json({ message: "Error while logging in", error })
  }
}

const userRegister = async (req, res) => {
  const user = new UserModel(req.body)
  user.password = await bcrypt.hash(req.body.password, 10)
  try {
    const response = await user.save()
    response.password = undefined
    if (response) {
    }

    return res.status(200).json({ message: "success", data: response })
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error })
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()
    return res.status(200).json({ message: "success", data: users })
  } catch (error) {
    res.status(500).json({ message: "Error in getting Users", error })
  }
}

module.exports = {
  userLogin,
  userRegister,
  getUsers
}
