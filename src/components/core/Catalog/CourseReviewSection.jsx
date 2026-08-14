import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { motion } from "framer-motion";

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';

import { CourseReviewCard } from "./CourseReviewCard";
import { getCourseAllReviews } from "../../../services/operations/rating&ReviewAPI";

export function CourseReviewSection({ courseId }) {
  const [reviewDatas, setReviewDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllReviewData = async () => {
      setIsLoading(true);

      try {
        const result = await getCourseAllReviews({ courseId })
        setReviewDatas(result)
      }
      catch (error) {
        console.log("Error fetching reviews:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchAllReviewData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: reviewDatas?.length > 3,
    modules: [Autoplay, Navigation, EffectFade],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
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

  // Function to get star color based on rating
  // const getStarColor = (rating) => {
  //     if (rating >= 4) return "text-green-500";
  //     if (rating >= 3) return "text-yellow-400";
  //     return "text-pink-400";
  // };

  return (
    <div className="w-full py-20 bg-richblack-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 items-center text-center pb-10"
        >
          <div className="flex gap-2 text-xl md:text-3xl lg:text-4xl font-bold text-richblack-5">
            <span className="text-yellow-50">Student Feedback</span>
            <span>For This Course</span>
          </div>

          <p className="text-richblack-300 max-w-2xl mx-auto">
            {`${reviewDatas?.length} Students shared their experience learning this course`}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
          </div>
        ) : reviewDatas && reviewDatas.length > 0 ? (
          <motion.div
            className="py-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Swiper {...swiperOptions}>
              {reviewDatas.map((reviewData) => (
                <SwiperSlide key={reviewData._id}>
                  <CourseReviewCard
                    reviewData={reviewData}
                    variants={itemVariants}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-richblack-400"
          >
            <p className="text-xl">No reviews available yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}