const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create Sub Section
exports.createSubSection = async (req, res) => {
  try {
    //data fetch
    const { title, description, sectionId } = req.body;
    console.log(title, description, sectionId)
    
    //extract video file
    const video = req.files.videoFile
    
    console.log(video)
    //data validation
    if (!title || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

    //create subsection
    const newSubSection = await SubSection.create(
      {
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url
      }
    )

    //update section with subsection objectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubSection._id
        }
      },
      { new: true }
      // Todo : log updated section here, after adding populate query
    ).populate("subSection")

    // const updatedCourse = await Course.findOne({
    //     courseContent : sectionId
    // })

    // console.log("updatedSection -> ", updatedCourse)

    //return response
    return res.status(200).json({
      updatedSection,
      success: true,
      message: "SubSection created successfully 😊"
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Getting error while creating section"
    })
  }
}

// Update Sub Section
exports.updateSubSection = async (req, res) => {
  try {
    //data input
    const { title, timeDuration, description, subSectionId } = req.body

    //extract video file
    const video = req.files.videoFile

    //data validation
    if (!title || !timeDuration || !description || !video || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

    //update data
    const subSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url
      },
      { new: true }
    )

    //return res
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully!"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update SubSection, please try again!",
      error: error.message
    })
  }
}

// Delete Sub Section
exports.deleteSubSection = async (req, res) => {
  try {
    //get Id from req body
    const { sectionId, subSectionId } = req.body

    //use findByIdAndDelete
    await SubSection.findByIdAndDelete(subSectionId)

    // Delete subsection from section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId
        }
      },
      { new: true }
    ).populate({
      path: "subSection"
    }).exec()

    //Todo : do we need to delete the entry from the course schema? -> No

    //return res
    return res.status(200).json({
      data: updatedSection,
      success: true,
      message: "SubSection deleted successfully!"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete subSection, please try again",
      error: error.message
    })
  }
}