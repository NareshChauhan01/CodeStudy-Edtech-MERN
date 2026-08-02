const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  otp: {
    type: String,
    required: true
  },

  // The expires option for mongoose expects a number of seconds after which the document should expire, not a date object.
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300  // 5 minutes in seconds
  }
})

//Function to send mail
async function sendVerificationMail(email, otp) {
  try {
    await mailSender(email, "Verification Email from CodeStudy", emailTemplate(otp))
    console.log("Mail sent successfully: ", mailResponse)
  }
  catch (error) {
    console.log("Getting error while sending mail!")
    console.error("Error occured while sending mails",error)
    throw err;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp)
  next()
})

module.exports = mongoose.model("Otp", otpSchema)