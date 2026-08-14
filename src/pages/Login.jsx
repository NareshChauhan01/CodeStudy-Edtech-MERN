import React from "react";
import { motion } from "framer-motion";

import logInImg from "../assests/images/login.webp";
import Template from "../components/core/Auth/Template";

export function Login() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Template
        heading="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={logInImg}
        formType="logIn"
      />
    </motion.div>
  );
}