const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const bcryptjs = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')

const mailSender = require('../utils/mailSender')
const { passwordUpdated } = require('../mail/templates/passwordUpdated')

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body

    //check wheather user is already present
    const checkUserPresent = await User.findOne({ email })

    //if user is already present, return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User already registered!'
      })
    }
    else {
      //generate otp
      var otp = otpGenerator.generate(6, {
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      })

      // console.log(`OTP generated successfully 😊`)

      //check  otp is unique or not
      let result = await OTP.findOne({ otp: otp })

      while (result) {
        otp = otpGenerator.generate(6, {
          specialChars: false,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
        })

        result = await OTP.findOne({ otp: otp })
      }

      const otpPayload = { email, otp }

      //create an entry for otp
      const otpBody = await OTP.create(otpPayload)
      // console.log(`OTP CREATED : -->  ${otpBody}`)

      //return response successfully
      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        otpBody
      })
    }
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      // message: "Failed to send OTP!",
      error: error.message,
    });
  }
}

// Sign Up
exports.signUp = async (req, res) => {
  try {
    //data fetch from req body
    const { accountType, firstName, lastName, email, password, confirmPassword, otp } = req.body

    //validate process
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //password matching
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not matched, it should be same!"
      })
    }

    //check user existance
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered!"
      })
    }

    //find most recent otp
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    // console.log(`Otp collected is : ${recentOtp}`)

    //validate OTP
    if (recentOtp.length == 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        User,
        message: "OTP not found!"
      })
    }
    else if (otp !== recentOtp[0].otp) {
      //Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!"
      })
    }

    //Hash Password
    const hashedPassword = await bcryptjs.hash(password, 15)

    //profile creation
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null
    })

    //entry create in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      // contact_no,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      // courses : [],
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      // courseProgress : null,
    })

    //return res
    return res.status(200).json({
      success: true,
      user,
      message: "User is registered successfully 😁"
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Getting error while registering user!"
    })
  }

}

// Login 
exports.logIn = async (req, res) => {
  try {
    //data fetch from req body
    const { email, password } = req.body

    //validation of data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //check for user existance
    const user = await User.findOne(
      { email }
    ).populate("additionalDetails")


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist!"
      })
    }

    //generate JWT token, if password matched
    if (await bcryptjs.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })

      user.token = token
      user.password = undefined

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  //expires in 3 days
        httpOnly: true
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully 🎉"
      })
    }
    else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect"
      })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Getting error while login!"
    })
  }
}

// Change Password
exports.changePassword = async (req, res) => {
  try {
    //get user data from req.user
    const userDetails = await User.findById(req.user.id)
    // console.log("changePASS -> ", userDetails)

    //data fetch from req body
    const { password, newPassword } = req.body

    //data validation
    if (!password || !newPassword) {
      return res.status(403).json({
        success: false,
        message: "All fiels are required!"
      })
    }

    //validation
    if (!await bcryptjs.compare(password, userDetails.password)) {
      return res.status(402).json({
        success: false,
        message: "Password does not matched!"
      })
    }

    //password encryption
    const encryptedPassword = await bcryptjs.hash(newPassword, 15)

    //password updation in db
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    //send password updation confirmation mail
    await mailSender(
      updatedUserDetails.email,
      "Password for your account has been updated",
      passwordUpdated(
        updatedUserDetails.email,
        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
      )
    )

    //return res
    return res.status(200).json({
      success: true,
      message: "Password changed successfully 👍"
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Getting error while changing password!"
    })
  }
}