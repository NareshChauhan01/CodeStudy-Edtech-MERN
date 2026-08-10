const express = require("express")
const router = express.Router()

const { contactUs } = require("../controllers/contactUs")

router.post("/enquiry", contactUs)

module.exports = router