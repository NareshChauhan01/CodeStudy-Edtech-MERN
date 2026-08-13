import React, { useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import { Button } from '../components/core/HomePage/Button';
import { Footer } from '../components/common/Footer';

import Banner from "../assests/videos/banner.mp4"
import knowYourProgress from "../assests/images/Know_your_progress.png"
import instructor from "../assests/images/Instructor.png"
import TimelineImage from "../assests/images/TimelineImage.png"
import planYourLessons from "../assests/images/Plan_your_lessons.png"
import compareWithOthers from "../assests/images/Compare_with_others.png"

import { codeSectionData, timelimePartData } from "../data/homePageData"
import { CodeSection } from "../components/core/HomePage/CodeSection"

import ExploreMore from "../components/core/HomePage/ExploreMore"
import { TimeLinePart } from "../components/core/HomePage/TimeLinePart"
import { BottomRightImage } from "../components/core/HomePage/BottomRightImage"


function Home() {

  // Animation control hooks
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const swissData = [
    knowYourProgress,
    compareWithOthers,
    planYourLessons
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-richblack-900">
      {/* Hero Section with Background Gradients */}

      <div className="relative min-h-screen bg-linear-to-br from-richblack-800 to-richblack-900">
        {/* Main Content */}
        <div className="relative w-10/12 mx-auto text-white">
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Hero Section */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to={"/signup"}>
                <motion.button
                  className="flex justify-center items-center gap-2 mt-12 md:mt-20 mb-6 md:mb-10 bg-richblack-900 font-semibold text-richblack-200 rounded-full px-6 sm:px-10 py-3 border-b-[0.2px] border-richblack-500 shadow-lg hover:scale-95 hover:bg-richblack-900 hover:border hover:border-richblack-700 transition-all duration-200"
                  whileHover={{
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "rgba(32, 37, 45, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Become an Instructor</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
              </Link>


              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span>Empower Your Future with </span>
                <HighlightText value="Coding Skills" />
              </motion.p>

              <motion.p
                className="font-medium text-sm sm:text-base md:text-lg tracking-wide text-richblack-300 w-full md:max-w-[87%] text-center mt-4 md:mt-5 mb-8 md:mb-14 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button value="Learn More" clr={true} linkTo={"/signup"} />
                <Button value="Book a Demo" clr={false} linkTo={"/login"} />
              </motion.div>
            </motion.div>

            {/* Video Banner */}
            <motion.div
              className="shadow-blue-600 shadow-custom2 w-full rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <video muted autoPlay loop className="w-full h-auto shadow-white shadow-custom1 border-none">
                <source src={Banner} />
              </video>
            </motion.div>

            {/* Code Sections */}
            {codeSectionData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <CodeSection
                  layout={item.layout}
                  headingValue1={item.headingValue1}
                  highlightValue={item.highlightValue}
                  headingValue2={item.headingValue2}
                  paraValue={item.paraValue}
                  buttonValue1={item.buttonValue1}
                  arrow={true}
                  clr1={true}
                  buttonValue2={item.buttonValue2}
                  clr2={false}
                  codeValue={item.codeValue}
                  codeClr={item.codeClr}
                />
              </motion.div>
            ))}

            {/* Explore More Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ExploreMore />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-linear-to-b from-pure-greys-5 to-pure-greys-5 relative">
        {/* Background Banner */}
        <motion.div
          className="w-full bgHome relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>

          <motion.div
            className="w-10/12 max-w-fit mx-auto py-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button value="Explore Full Catalog" clr={true} arrow={true} />
            <Button value="Learn More" />
          </motion.div>
        </motion.div>

        <div className="w-10/12 mx-auto py-12 md:py-20">
          {/* Skills Heading Section */}
          <motion.div
            className="w-full flex flex-col justify-between gap-2 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-bold"
              whileInView={{ scale: [0.95, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-richblack-800">Get the skills you need for a </span>
              <HighlightText value="job that is in demand." />
            </motion.div>

            <motion.div
              className="w-full text-center flex flex-col gap-6 md:gap-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="tracking-wide text-black">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </span>

              {/* <Button value="Learn More" clr={true} /> */}
            </motion.div>
          </motion.div>

          {/* Timeline Section */}
          <div className="w-full flex flex-col lg:flex-row justify-between my-12 md:my-20 gap-16 lg:gap-0" ref={ref}>
            {/* Timeline Items */}
            <motion.div
              className="flex flex-col justify-around gap-8 lg:gap-0 relative"
              variants={staggerContainer}
              initial="hidden"
              animate={controls}
            >
              {/* Vertical Timeline Connector */}
              <div className="absolute left-6 top-10 bottom-10 w-0.5 hidden lg:block"></div>

              {timelimePartData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <TimeLinePart
                    imgSource={item.imgSource}
                    heading={item.heading}
                    para={item.para}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Timeline Image and Stats */}
            <motion.div
              className="relative mx-auto lg:mx-0"
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
            >
              <BottomRightImage imgSource={TimelineImage} />

              {/* Stats Card */}
              <motion.div
                className="absolute z-20 flex flex-col sm:flex-row items-center justify-evenly bg-linear-to-r from-caribbeangreen-700 to-caribbeangreen-600 w-[90%] py-5 px-4 sm:px-16 -bottom-12 left-[5%] rounded-xl shadow-xl border border-caribbeangreen-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center place-content-start gap-4 sm:gap-10 mb-4 sm:mb-0">
                  <motion.p
                    className="font-bold text-white text-3xl sm:text-4xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    10
                  </motion.p>
                  <p className="uppercase max-w-full sm:max-w-[20%] text-caribbeangreen-300 text-sm sm:text-base font-medium">
                    Years experiences
                  </p>
                </div>

                <div className="hidden sm:block bg-linear-to-b from-caribbeangreen-500/30 via-caribbeangreen-500 to-caribbeangreen-500/30 w-px h-16"></div>

                <div className="flex items-center place-content-end gap-4 sm:gap-10">
                  <motion.p
                    className="font-bold text-white text-3xl sm:text-4xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    250
                  </motion.p>

                  <p className="uppercase max-w-full sm:max-w-[40%] text-caribbeangreen-300 text-sm sm:text-base font-medium">
                    types of courses
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Swiss Knife Section */}
          <motion.div
            className="flex flex-col justify-center items-center gap-5 mt-24 md:mt-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-bold px-2"
              whileInView={{ scale: [0.95, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-richblack-700">Your swiss knife for </span>
              <HighlightText value="learning any language" />
            </motion.div>

            <motion.p
              className="w-full md:max-w-[80%] lg:max-w-[70%] text-center tracking-wide text-black px-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </motion.p>

            <motion.div
              className="w-full flex flex-col md:flex-row justify-center items-center mt-8 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {
                swissData.map((item, id) => (
                  <motion.img
                    key={id}
                    loading="lazy"
                    src={item}
                    className="w-75 md:w-87.5 lg:w-112.5 md:-mr-16 lg:-mr-32 mb-4 md:mb-0"
                    alt="swiss-knief"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  />
                ))
              }
            </motion.div>

            <Button value="Learn More" clr={true} />
          </motion.div>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="w-10/12 mx-auto py-10">
        <motion.div
          className="my-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-full lg:w-auto mx-auto lg:mx-0"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <BottomRightImage imgSource={instructor} />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 md:gap-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-center lg:text-left">
              <span className="text-white">Become an </span>
              <HighlightText value="instructor" />
            </div>

            <p className="w-full lg:max-w-[80%] tracking-wide text-richblack-200 text-center lg:text-left">
              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className="grid place-items-center md:place-items-start lg:place-items-start">
              <Button value="Start Teaching Today" clr={true} arrow={true} />
            </div>
          </motion.div>
        </motion.div>

        {/* Review Section */}
        {/* <ReviewPage /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home