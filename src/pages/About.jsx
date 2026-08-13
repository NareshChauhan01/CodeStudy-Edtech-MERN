import React from "react";
import { motion } from "framer-motion";

import { Footer } from "../components/common/Footer"
import aboutImg1 from "../assests/images/aboutus1.webp"
import aboutImg2 from "../assests/images/aboutus2.webp"
import aboutImg3 from "../assests/images/aboutus3.webp"
import { Button } from "../components/core/HomePage/Button"
import { features, acheivementData } from ".././data/aboutData"
import FoundingStoryImage from "../assests/images/FoundingStory.png"
import { HighlightText } from "../components/core/HomePage/HighlightText";
import { ContactTemplate } from "../components/contactPage/ContactTemplate";

export function About() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="text-richblack-5 bg-richblack-900">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-richblack-800 to-richblack-900 relative overflow-hidden">
        {/* Background elements */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEgMS4xIDIuMSAyLjNWNDMuN2MwIDEuMi0uOSAyLjMtMi4xIDIuM0gxOGMtMS4yIDAtMi4xLTEuMS0yLjEtMi4zVjIwLjNjMC0xLjIuOS0yLjMgMi4xLTIuM2gxOHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div> */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-50 opacity-10 blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>

        <div className="w-10/12 mx-auto relative">
          <motion.div
            className="text-center flex flex-col pt-12 sm:pt-16 md:pt-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-bold px-4"
              variants={fadeIn}
            >
              Driving Innovation in Online Education for a
            </motion.h1>
            <motion.div
              className="my-2 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              variants={fadeIn}
            >
              <HighlightText value="Brighter Future" />
            </motion.div>
            <motion.p
              className="text-sm sm:text-base font-normal text-richblack-100 max-w-200 mx-auto mt-3 px-4 mb-12 md:mb-20"
              variants={fadeIn}
            >
              Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </motion.p>
          </motion.div>
        </div>

        {/* Image Gallery - Responsive */}
        <motion.div
          className="w-10/12 mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="w-full sm:w-1/3 aspect-video overflow-hidden rounded-xl shadow-lg"
            variants={imageVariant}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <img
              src={aboutImg1}
              loading="lazy"
              alt="Students learning online"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            className="w-full sm:w-1/3 aspect-video overflow-hidden rounded-xl shadow-lg sm:mt-10"
            variants={imageVariant}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <img
              src={aboutImg2}
              loading="lazy"
              alt="Tech education"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            className="w-full sm:w-1/3 aspect-video overflow-hidden rounded-xl shadow-lg"
            variants={imageVariant}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <img
              src={aboutImg3}
              loading="lazy"
              alt="Educational technology"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        className="border-b border-richblack-700 my-12 md:my-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-10/12 max-w-full md:max-w-[90%] lg:max-w-[80%] mx-auto text-center pb-10 md:pb-20">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            We are passionate about revolutionizing the way we learn. Our innovative platform {" "}
            <span className="inline md:inline-block">
              <HighlightText value="combines technology, " />
            </span>
            <span className="bg-linear-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
              expertise,{" "}
            </span>
            <span>and community to create an </span>
            <span className="bg-linear-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
              unparalleled educational experience.
            </span>
          </motion.h2>
        </div>
      </motion.div>

      {/* Founding Story Section */}
      <div className="w-10/12 mx-auto text-richblack-5 mb-16 md:mb-20">
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16 md:mb-32 lg:mb-60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col gap-6 md:gap-10"
            variants={fadeIn}
          >
            <h2 className="bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent">
              Our Founding Story
            </h2>

            <p className="text-richblack-100 max-w-full lg:max-w-150 text-base md:text-lg">
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>

            <p className="text-richblack-100 max-w-full lg:max-w-150 text-base md:text-lg">
              As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </p>
          </motion.div>

          <motion.div
            variants={imageVariant}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              loading="lazy"
              src={FoundingStoryImage}
              alt="Founding-Story"
              className="relative w-full max-w-125 h-auto rounded-3xl"
            />
          </motion.div>
        </motion.div>

        {/* Vision and Mission */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between gap-10 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col gap-5 md:gap-10"
            variants={fadeIn}
          >
            <h2 className="bg-linear-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent">
              Our Vision
            </h2>
            <p className="text-richblack-100 max-w-full lg:max-w-121.25 text-base md:text-lg">
              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5 md:gap-10"
            variants={fadeIn}
          >
            <HighlightText value="Our Mission" fStyle={`font-bold text-2xl md:text-3xl lg:text-4xl`} />
            <p className="text-richblack-100 max-w-full lg:max-w-125 text-base md:text-lg">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <div className="bg-linear-to-r from-richblack-800 to-richblack-700 py-16 mb-16 md:mb-20 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-50 opacity-5 blur-[80px]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-pink-500 opacity-5 blur-[80px]"></div>

        <motion.div
          className="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {acheivementData.map((element, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-richblack-900 bg-opacity-40 backdrop-blur-sm border border-richblack-600 hover:shadow-lg hover:shadow-yellow-50/5 transition-all duration-300"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text mb-2">{element.title}</span>
              <span className="text-richblack-300">{element.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Grid Section */}
      <motion.div
        className="w-10/12 mx-auto mb-16 md:mb-28 flex flex-col justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="mb-12 md:mb-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((element, index) => (
              <motion.div
                key={index}
                className={`
                                    flex flex-col p-6 md:p-10 rounded-lg hover:shadow-lg hover:shadow-yellow-50/5 transition-all duration-300 relative
                                    ${(element.order) % 2 === 0 ? "bg-richblack-800" : "bg-richblack-700"}
                                    ${(element.order) === 0 ? "md:col-span-2 bg-linear-to-br from-richblack-900 to-richblack-800" : "gap-5"}
                                    ${(element.order) === 3 ? "md:col-start-2" : ""}
                                `}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {element.order === 0 && (
                  <>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-yellow-50 opacity-5 blur-3xl"></div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold flex flex-col mb-5 relative">
                      <span>{element.title1}</span>
                      <HighlightText value={element.title2} />
                    </div>
                  </>
                )}

                {element.order !== 0 && (
                  <>
                    <span className="text-lg md:text-xl font-bold bg-linear-to-r from-white to-richblack-300 bg-clip-text text-transparent">{element.title}</span>
                    <span className="text-richblack-100 text-base md:text-lg mb-5">{element.desc}</span>
                  </>
                )}

                {element.order === 0 && (
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button value={element.btn} clr={true} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <motion.div
          className="w-full max-w-maxContentTab mx-auto relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-1 bg-linear-to-r from-yellow-50 via-pink-500 to-blue-500 rounded-xl blur-md opacity-20"></div>
          <div className="relative bg-richblack-800 rounded-xl p-1">
            <ContactTemplate
              title="Get in Touch"
              desc="We'd love to here for you, Please fill out this form."
            />
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}