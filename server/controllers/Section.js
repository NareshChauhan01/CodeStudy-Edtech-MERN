const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const Course = require("../models/Course")

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body

    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //create section
    const newSection = await Section.create({ sectionName })

    //update course with section objectId
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id
        }
      },
      { new: true }
      // Todo : use populate to replace section/sub-sections both in the updated course details
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection"
      }
    }).exec()

    //return response
    return res.status(200).json({
      updatedCourse,
      success: true,
      message: "Section created successfully 😊"
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

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //update data
    const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })

    //return res
    return res.status(200).json({
      success: true,
      message: "Section updated successfully!"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again!",
      error: error.message
    })
  }
}

exports.deleteSection = async (req, res) => {
  try {
    //get Id from req body
    const { sectionId, courseId } = req.body

    // Delete subSections of respected section
    const section = await Section.findById(sectionId)

    await SubSection.deleteMany(
      {
        _id: {
          $in: section.subSection
        }
      }
    )

    //Todo : do we need to delete the entry from the course schema? -> Yes
    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: sectionId
        }
      },
      { new: true }
    )

    //use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId)

    // fetch updated course
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection"
      }
    }).exec()

    //return res
    return res.status(200).json({
      data: course,
      success: true,
      message: "Section deleted successfully!"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
      error: error.message
    })
  }
}