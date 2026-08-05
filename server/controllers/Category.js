const Category = require("../models/Category")

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

//create tag ka handler function
exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body

    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description
    })

    // console.log(categoryDetails)

    //return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully 😁"
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Getting error while creating category!"
    })
  }
}

//getAllTags handler function
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { name: true, description: true })

    res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      categories,
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Getting error while returning all categories!"
    })
  }
}

//category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    //get category id
    const { categoryId } = req.body

    //get course for specificied categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: {
          status: "Published"
        },
        populate: {
          path: "category"
        },
        // populate : {
        //     path : "ratingAndReviews"
        // },
        // populate : "ratingAndReviews"
      })
      .exec()

    // console.log("selectedCategory", selectedCategory)

    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      })
    }

    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course is not found for the selected category"
      })
    }

    //get coursefor different categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId }  //ne : not equal to
    })

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
    ).populate({
      path: "courses",
      match: {
        status: "Published"
      }
    }).exec()

    //get top selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: {
        status: "Published"
      },
      populate: {
        path: "instructor"
      }
    }).exec()

    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)


    //return res
    return res.status(200).json({
      success: true,
      message: "Category page details fetched successfully",
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses
      }
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get category page details",
      error: error.message
    })
  }
}