const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Sub section does not exist!"
      })
    }

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId
    })

    if (!courseProgress) {
      return res.status(404).json({
        error: "Course Progress does not exist"
      })
    }

    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(200).json({
        success: false,
        message: "Video already completed"
      })
    }

    courseProgress.completedVideos.push(subSectionId);
    // console.log("Copurse Progress Push Done");

    await courseProgress.save();
    // console.log("Course Progress Save call Done");

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    })

  }
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to update course progress at backend!"
    })
  }
}