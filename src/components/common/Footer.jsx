import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaDiscord } from "react-icons/fa";

// import logo from "../../assests/logos/Logo-Full-Light.png";
import toast from "react-hot-toast";

export function Footer() {
  const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];

  const Company = ["About", "Careers", "Affiliates"];
  const Plans = ["Paid Memberships", "For Students", "Business Solutions"];
  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  const Community = ["Forums", "Chapters", "Events"];

  // For mobile accordion functionality
  const [openSection, setOpenSection] = useState(null);
  const [email, setEmail] = useState("");

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    toast.success("Subscribed successfully! Check your email for updates.");
    // console.log("Subscribed with email:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const accordionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <div className="w-full bg-richblack-900 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600/10 via-yellow-50/30 to-blue-600/10"></div>
      <div className="absolute top-0 -left-28 w-72 h-72 rounded-full bg-blue-500 opacity-5 blur-[100px]"></div>
      <div className="absolute bottom-0 -right-28 w-72 h-72 rounded-full bg-yellow-50 opacity-5 blur-[100px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,214,10,0.03),transparent_40%)]"></div>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 8px 15px rgba(255, 214, 10, 0.2)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IoIosArrowUp className="text-xl" />
      </motion.button>

      {/* Newsletter Banner */}
      <div className="w-full bg-linear-to-r from-richblack-800 to-richblack-700 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMSAxLTEyIDAgNiA2IDAgMCAxIDEyIDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <motion.div
          className="w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Join Our Tech Community</h2>
            <p className="text-richblack-100 max-w-md">Get weekly updates, coding tips, and special offers directly to your inbox</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex">
            <div className="relative w-full md:w-80">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-richblack-600 text-richblack-50 border-none rounded-l-md py-3 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              />
            </div>
            <motion.button
              type="submit"
              className="bg-yellow-50 text-richblack-900 font-semibold px-4 py-3 rounded-r-md"
              whileHover={{ backgroundColor: "#E6C200" }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.footer
        className="w-10/12 mx-auto flex flex-col gap-10 text-richblack-400 relative z-10 pt-16 pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo and Social */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <motion.p

              alt="CodeStudy Logo"
              className="h-12 object-contain mb-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >CodeStudy</motion.p>
            <p className="text-richblack-300 text-center lg:text-start mb-6">
              Empowering students to excel in tech through interactive learning experiences and practical courses.
            </p>

            <div className="flex flex-wrap mx-auto lg:mx-0 gap-4 mb-6">
              {[
                { icon: <FaFacebook />, color: "hover:bg-blue-600" },
                { icon: <FaTwitter />, color: "hover:bg-blue-400" },
                { icon: <FaInstagram />, color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" },
                { icon: <FaLinkedinIn />, color: "hover:bg-blue-700" },
                { icon: <FaYoutube />, color: "hover:bg-red-600" },
                { icon: <FaDiscord />, color: "hover:bg-indigo-500" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-richblack-800 flex items-center justify-center text-richblack-300 transition-all duration-300 ${item.color} hover:text-white`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Resources and Support */}
          <motion.div variants={itemVariants}>
            {/* Resources - Mobile Accordion */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between text-white font-bold py-2 cursor-pointer md:cursor-default border-b border-richblack-700 md:border-none group"
                onClick={() => toggleSection('resources')}
              >
                <span className="relative text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 group-hover:after:w-full">
                  Resources
                </span>
                <motion.div
                  animate={{ rotate: openSection === 'resources' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden"
                >
                  <IoIosArrowDown className="transition-transform duration-300" />
                </motion.div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="flex flex-col gap-3 mt-4 overflow-hidden md:max-h-96 md:opacity-100"
                  initial="hidden"
                  animate={openSection === 'resources' ? "visible" : "hidden"}
                  variants={accordionVariants}
                  exit="hidden"
                >
                  {Resources.map((ele, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <Link
                        to={ele.split(" ").join("-").toLocaleLowerCase()}
                        className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                      >
                        {ele}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Support - Mobile Accordion */}
            <>
              <div
                className="flex items-center justify-between text-white font-bold py-2 cursor-pointer md:cursor-default border-b border-richblack-700 md:border-none group"
                onClick={() => toggleSection('support')}
              >
                <span className="relative text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 group-hover:after:w-full">
                  Support
                </span>
                <motion.div
                  animate={{ rotate: openSection === 'support' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden"
                >
                  <IoIosArrowDown className="transition-transform duration-300" />
                </motion.div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="flex flex-col gap-3 mt-4 overflow-hidden md:max-h-96 md:opacity-100"
                  initial="hidden"
                  animate={openSection === 'support' ? "visible" : "hidden"}
                  variants={accordionVariants}
                  exit="hidden"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Link
                      to="/help-center"
                      className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                    >
                      Help Center
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Link
                      to="/contact"
                      className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </>
          </motion.div>

          {/* Column 3: Company and Plans */}
          <motion.div variants={itemVariants}>
            {/* Company - Mobile Accordion */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between text-white font-bold py-2 cursor-pointer md:cursor-default border-b border-richblack-700 md:border-none group"
                onClick={() => toggleSection('company')}
              >
                <span className="relative text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 group-hover:after:w-full">
                  Company
                </span>
                <motion.div
                  animate={{ rotate: openSection === 'company' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden"
                >
                  <IoIosArrowDown className="transition-transform duration-300" />
                </motion.div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="flex flex-col gap-3 mt-4 overflow-hidden md:max-h-96 md:opacity-100"
                  initial="hidden"
                  animate={openSection === 'company' ? "visible" : "hidden"}
                  variants={accordionVariants}
                  exit="hidden"
                >
                  {Company.map((ele, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <Link
                        to={ele.split(" ").join("-").toLocaleLowerCase()}
                        className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                      >
                        {ele}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Plans - Mobile Accordion */}
            <>
              <div
                className="flex items-center justify-between text-white font-bold py-2 cursor-pointer md:cursor-default border-b border-richblack-700 md:border-none group"
                onClick={() => toggleSection('plans')}
              >
                <span className="relative text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 group-hover:after:w-full">
                  Plans
                </span>
                <motion.div
                  animate={{ rotate: openSection === 'plans' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden"
                >
                  <IoIosArrowDown className="transition-transform duration-300" />
                </motion.div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="flex flex-col gap-3 mt-4 overflow-hidden md:max-h-96 md:opacity-100"
                  initial="hidden"
                  animate={openSection === 'plans' ? "visible" : "hidden"}
                  variants={accordionVariants}
                  exit="hidden"
                >
                  {Plans.map((ele, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <Link
                        to={ele.split(" ").join("-").toLocaleLowerCase()}
                        className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                      >
                        {ele}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          </motion.div>

          {/* Column 4: Community and Highlighted Links */}
          <motion.div variants={itemVariants}>
            {/* Community - Mobile Accordion */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between text-white font-bold py-2 cursor-pointer md:cursor-default border-b border-richblack-700 md:border-none group"
                onClick={() => toggleSection('community')}
              >
                <span className="relative text-lg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-50 after:transition-all after:duration-300 group-hover:after:w-full">
                  Community
                </span>
                <motion.div
                  animate={{ rotate: openSection === 'community' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden"
                >
                  <IoIosArrowDown className="transition-transform duration-300" />
                </motion.div>
              </div>

              <AnimatePresence>
                <motion.div
                  className="flex flex-col gap-3 mt-4 overflow-hidden md:max-h-96 md:opacity-100"
                  initial="hidden"
                  animate={openSection === 'community' ? "visible" : "hidden"}
                  variants={accordionVariants}
                  exit="hidden"
                >
                  {Community.map((ele, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <Link
                        to={ele.split(" ").join("-").toLocaleLowerCase()}
                        className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                      >
                        {ele}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Featured Courses */}
            <>
              <h3 className="text-white font-bold text-lg mb-4">Featured Courses</h3>
              <div className="flex flex-col gap-3">
                {[
                  "Full Stack Development",
                  "Data Science Essentials",
                  "UI/UX Design Mastery",
                  "Python for Machine Learning"
                ].map((course, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Link
                      to="#"
                      className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-all duration-200 block py-1 group-hover:pl-1"
                    >
                      {course}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-richblack-700/20 via-richblack-700 to-richblack-700/20 my-4"></div>

        {/* Bottom Footer Section */}
        <div className="flex flex-col sm:flex-row mx-auto lg:mx-0 justify-between gap-4 text-xs sm:text-sm">
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {BottomFooter.map((ele, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={ele.split(" ").join("-").toLocaleLowerCase()}
                  className="cursor-pointer text-richblack-300 hover:text-yellow-50 transition-all duration-200"
                >
                  {ele}
                </Link>
                {idx < BottomFooter.length - 1 && (
                  <span className="text-richblack-600 mx-4">|</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.span
            className="text-base text-center sm:text-right text-richblack-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Made with <span className="text-red-500 animate-pulse">❤️</span> Naresh Chauhan © 2026 CodeStudy
          </motion.span>
        </div>
      </motion.footer>
    </div>
  );
}