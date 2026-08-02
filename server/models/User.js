const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    immutable: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Instructor", "Student"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course"
    }
  ],
  image: {
    type: String,
    required: true,
    // default: "https://your-default-image-url.com/avatar.png",
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress"
    }
  ],
  token: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  }

})

module.exports = mongoose.model("User", userSchema)