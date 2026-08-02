const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');

// Send OTP
exports.sendOTP = async (req, res) => {
  try {

    //fetch email from request body
    const { email } = req.body;
    console.log("fetch email form email body", email);

    // check if user already exist
    const checkUserPresent = await User.findOne({ email });

    //if user is already present, return a response
    if (checkUserPresent) {
      return res.status(401), json({
        success: false,
        message: "User already registered!"
      })
    } else {
      // Generator OTP
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
      })

      console.log("OTP Generated Successfully", otp)

      // Check unique otp or not
      let result = await OTP.findOne({ otp: otp });

      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false
        })
        result = await OTP.findOne({ otp: otp });
      }

      const otpPayload = { email, otp };

      // Create an entry for OTP 
      const otpBody = await OTP.create(otpPayload);
      console.log("OTP Created", otpBody);

      // return successful response
      res.status(200).json({
        success: true,
        message: "OTP Sent Successfully",
        otpBody
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP!",
      err: err.message
    })
  }
}