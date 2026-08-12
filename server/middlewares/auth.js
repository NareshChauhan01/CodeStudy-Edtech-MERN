const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require("../models/User")

//auth
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||     // Check token in cookies
      req.body.token ||        // Check token in request body
      req.header("Authorization").replace("Bearer ", "")    // Extract token from Authorization header

    //if token missing , then return res
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing!'
      })
    }

    //verify token
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      // console.log("Decode : ", decode)
      req.user = decode
    }
    catch (error) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: 'token is invalid'
      })
    }
    next()
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Getting error in middlewares auth"
    })

  }
}

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    console.log("Hello")
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only"
      })
    }
    next()
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again"
    })
  }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only"
      })
    }
    next()
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again"
    })
  }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email })

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin only"
      })
    }
    next()
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again"
    })
  }
}