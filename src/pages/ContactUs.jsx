import React from "react";
import { motion } from "framer-motion";

import * as Icon1 from "react-icons/pi";
import * as Icon2 from "react-icons/fa";

import { Footer } from "../components/common/Footer";
import { contactDetails } from "../data/contactDetails";
import { ContactTemplate } from "../components/contactPage/ContactTemplate";

export function ContactUs() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero section with background elements */}
      <div className="relative pt-10 md:pt-20 lg:pt-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-richblack-800 to-transparent opacity-60"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-yellow-50 rounded-full filter blur-[120px] opacity-5"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-5"></div>

        {/* Page title */}
        <motion.div
          className="relative w-10/12 max-w-maxContent mx-auto text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-richblack-5 mb-4">
            Contact <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">Us</span>
          </p>
          <p className="text-richblack-300 max-w-[600px] mx-auto">
            Get in touch with our team to learn more about our platform, courses, or any other questions you might have.
          </p>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="w-10/12 max-w-maxContent mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 text-richblack-5 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information Panel */}
          <motion.div
            className="w-full lg:max-w-[400px] h-fit flex flex-col gap-8 lg:gap-10 bg-gradient-to-br from-richblack-800 to-richblack-700 rounded-2xl p-8 lg:p-10 order-2 lg:order-1 border border-richblack-600 shadow-lg"
            variants={itemVariants}
          >
            <div className="relative">
              <p className="text-xl md:text-2xl font-bold text-richblack-5 mb-6">
                Connect With Us
              </p>
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-50 rounded-full"></div>
            </div>

            <div className="space-y-8">
              {contactDetails.map((element, index) => {
                let Icon = Icon1[element.image] || Icon2[element.image];

                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-richblack-900 aspect-square w-10 p-2 grid place-content-center rounded-full shadow-md border border-richblack-600 group-hover:bg-yellow-50 group-hover:text-richblack-900 transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-bold mb-1">{element.title}</p>
                      <p className="text-richblack-100 text-sm font-medium mb-1">{element.desc}</p>
                      <p className="text-yellow-50 text-sm font-medium">{element.contact}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-lg font-semibold mb-4">Follow Us</p>
              <div className="flex gap-4">
                {["FaTwitter", "FaFacebook", "FaInstagram", "FaLinkedin"].map((icon, index) => {
                  const SocialIcon = Icon2[icon];
                  return (
                    <motion.a
                      key={index}
                      href="#"
                      className="bg-richblack-700 p-3 rounded-full hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-300 border border-richblack-600"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SocialIcon className="text-lg" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="w-full order-1 lg:order-2"
            variants={itemVariants}
          >
            <ContactTemplate
              title="Got a Idea? We've got the skills. Let's team up"
              desc="Tell us more about yourself and what you're got in mind."
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        className="w-10/12 max-w-maxContent mx-auto my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-br from-richblack-800 to-richblack-700 p-2 rounded-2xl border border-richblack-600 shadow-lg overflow-hidden">
          <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.1758480077333!2d86.79593977486265!3d25.962272600289282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee36d1a1bf4b45%3A0xd0d19cdb17887f59!2sB.%20P.%20Mandal%20College%20of%20Engineering%20Madhepura!5e0!3m2!1sen!2sin!4v1745001334764!5m2!1sen!2sin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="StudyNotion Location"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="w-10/12 max-w-maxContent mx-auto my-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl md:text-3xl font-bold text-richblack-5 mb-3">
          Frequently Asked <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">Questions</span>
        </p>
        <p className="text-richblack-300 mb-12 max-w-[600px] mx-auto">
          Find answers to common questions about our services and platform.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {[
            { q: "How do I sign up for a course?", a: "You can sign up by creating an account and browsing our course catalog. Once you find a course you're interested in, simply click on 'Enroll Now'." },
            { q: "What payment methods do you accept?", a: "We accept credit/debit cards, PayPal, and various local payment methods depending on your region." },
            { q: "Can I get a refund if I'm not satisfied?", a: "Yes, we offer a 7-day money-back guarantee if you're not completely satisfied with your purchase." },
            { q: "How do I access my enrolled courses?", a: "After logging in, go to your dashboard where you'll find all your enrolled courses ready to access." }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-richblack-800 to-richblack-700 p-6 rounded-xl border border-richblack-600 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-bold text-richblack-5 mb-2">{faq.q}</h3>
              <p className="text-richblack-300 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}