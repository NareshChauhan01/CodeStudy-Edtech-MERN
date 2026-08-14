import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import { Footer } from "../components/common/Footer"
import { CourseSlider } from "../components/core/Catalog/CourseSlider";
import { fetchCourseCategories, getCatalogpageData } from "../services/operations/courseAPI"


export function Catalog() {
  const { catalogName } = useParams()
  const courseSection = [
    {
      id: 1,
      title: "Most Popular"
    },
    {
      id: 2,
      title: "New"
    }
  ]
  const [categoryId, setCategoryId] = useState("")
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const result = await fetchCourseCategories()
        const category_id = result.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [catalogName])

  // Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const result = await getCatalogpageData({ categoryId })
        if (result) {
          setCatalogPageData(result)
        }
        setLoading(false)
      } catch (error) {
        console.log("Error fetching catalog data:", error)
        setLoading(false)
      }
    }

    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] grid place-content-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-richblack-700 border-t-yellow-50 animate-spin"></div>
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-yellow-50 animate-spin" style={{ animationDuration: '1s' }}></div>
          </div>
          <p className="text-richblack-100 text-lg">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" text-richblack-5 bg-richblack-900">
      {/* Header Section */}
      <div className="pt-10 md:pt-20 lg:pt-20 bg-linear-to-b from-richblack-800 to-richblack-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-50 opacity-10 blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>

        <div className="w-11/12 sm:w-10/12 max-w-300 mx-auto flex flex-col gap-4 md:gap-6 relative">
          {/* Breadcrumbs */}
          <motion.div
            className="flex items-center text-sm text-richblack-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center hover:text-yellow-50 transition-colors">
              <FaHome className="mr-2" />
              <span>Home</span>
            </Link>
            <IoIosArrowForward className="mx-2" />
            <Link to="/catalog" className="hover:text-yellow-50 transition-colors">
              <span>Catalog</span>
            </Link>
            <IoIosArrowForward className="mx-2" />
            <span className="text-yellow-100 font-medium">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </motion.div>

          {/* Category Title */}
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-white to-richblack-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {catalogPageData?.data?.selectedCategory?.name}
          </motion.h1>

          {/* Category Description */}
          <motion.p
            className="text-richblack-300 text-sm md:text-base max-w-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {catalogPageData?.data?.selectedCategory?.description}
          </motion.p>
        </div>
      </div>

      {/* Courses Sections */}
      <div className="bg-richblack-900 py-20 md:py-20 relative">
        <div className="w-11/12 sm:w-10/12 max-w-300 mx-auto flex flex-col gap-16">
          {/* Get Started Courses */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-yellow-50 rounded-full mr-3"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Courses to get you started
              </h2>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 flex border-b border-richblack-700 overflow-x-auto">
              {courseSection.map((ele) => (
                <motion.button
                  key={ele.id}
                  onClick={() => setActive(ele.id)}
                  className={`pb-2 px-4 md:px-6 cursor-pointer whitespace-nowrap text-sm md:text-base transition-all duration-200
                                        ${ele.id === active
                      ? "border-b-2 border-b-yellow-100 text-yellow-100 font-medium"
                      : "text-richblack-100 hover:text-yellow-50"}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {ele.title}
                </motion.button>
              ))}
            </div>

            {/* Course Slider */}
            <div className="w-full">
              <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>
          </motion.div>

          {/* Top Courses Section */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-yellow-50 rounded-full mr-3"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Top courses in {catalogPageData?.data?.differentCategory?.name || "Web Development"}
              </h2>
            </div>
            <div className="w-full">
              <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
            </div>
          </motion.div>

          {/* Frequently Bought Section */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-yellow-50 rounded-full mr-3"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Frequently Bought
              </h2>
            </div>
            <div className="w-full">
              <CourseSlider courses={catalogPageData?.data?.mostSellingCourses} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}