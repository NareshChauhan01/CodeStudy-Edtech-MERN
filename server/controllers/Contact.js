const mailSender = require("../utils/mailSender")
const Enquiry = require("../models/Enquiry")
const { enquiryTemplate } = require("../mail/templates/enquiryTemplate")

exports.contactUs = async (req, res) => {
  try {
    // data fetch from req body
    const {
      firstName,
      lastName,
      email,
      phone,
      message
    } = req.body

    // data validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!"
      })
    }

    // Mail send to admin
    const mailResponse = await mailSender(
      email,
      "Your Data send successfully",
      enquiryTemplate(
        firstName,
        lastName,
        email,
        phone,
        message
      )
    )

    // db entry
    const enquiryData = await Enquiry.create({
      firstName,
      lastName,
      email,
      phone,
      message
    })

    return res.status(200).json({
      success: true,
      message: "Mail send successfully"
    })
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Getting error while sending message!",
    })
  }
}