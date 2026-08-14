import React from "react";
import { motion } from "framer-motion";
import Template from "../components/core/Auth/Template";
import signUpImg from "../assests/images/signup.webp";

export function Signup() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Template
        heading="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signUpImg}
        formType="signUp"
      />
    </motion.div>
  );
}