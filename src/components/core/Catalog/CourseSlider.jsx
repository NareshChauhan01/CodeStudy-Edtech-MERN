import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { motion } from "framer-motion";

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';

import { HiOutlineBookOpen } from "react-icons/hi";
import { CourseCard } from "./CourseCard";

export function CourseSlider({ courses }) {
  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: courses?.length > 3,
    modules: [Autoplay, Navigation, EffectFade],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    className: "w-full mySwiper py-8"
  };

  return (
    <div className="relative">
      {courses?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="swiper-container"
        >
          <Swiper {...swiperOptions}>
            {courses.map((course, index) => (
              <SwiperSlide key={index} className="pb-6">
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-lg py-16 px-4 border border-richblack-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-richblack-700 p-4 rounded-full mb-4">
            <HiOutlineBookOpen className="text-yellow-50 text-3xl" />
          </div>
          <p className="text-center text-lg sm:text-xl md:text-2xl font-medium text-richblack-5 mb-2">
            No Courses Found
          </p>
          <p className="text-center text-sm text-richblack-300 max-w-md">
            We couldn't find any courses in this category. Please check back later or explore other categories.
          </p>
        </motion.div>
      )}
    </div>
  )
}