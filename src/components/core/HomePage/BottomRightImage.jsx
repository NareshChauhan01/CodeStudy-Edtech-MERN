import React from "react";
import { motion } from "framer-motion";

export function BottomRightImage({ imgSource }) {
  return (
    <motion.figure
      className="shadow-blue-600 shadow-custom2 relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 30px rgba(37, 99, 235, 0.3)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

      <img loading="lazy" alt="image" src={imgSource} className="w-full h-[90%] shadow-white shadow-custom1 border-none relative z-10 rounded-xl"></img>
    </motion.figure>
  )
}