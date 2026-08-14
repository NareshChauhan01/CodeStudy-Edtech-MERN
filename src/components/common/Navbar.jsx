import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { matchPath, NavLink, useLocation } from "react-router-dom";

import { HiMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";

import { Menu } from "./Menu";
import navbarData from "../../data/navbar-links";
// import logo from "../../assests/logos/Logo-Full-Light.png";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { fetchCourseCategories } from "../../services/operations/courseAPI";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetchCourseCategories();
      setCategories(result);
    };

    fetchCategories();
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      className={`sticky top-0 z-50 w-full border-b border-richblack-700 transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="w-11/12 sm:w-10/12 mx-auto py-2 text-white flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <motion.p
            className="w-32 sm:w-40"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            CodeStudy

          </motion.p>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navbarData.map((element, index) => (
            element.title === "Catalog" ? (
              <div
                key={index}
                className={`
                                    relative flex justify-center items-center gap-1 cursor-pointer group
                                    ${matchRoute("/catalog/:catalogName") ? "text-yellow-50 font-medium" : "text-richblack-25 hover:text-yellow-50 transition-colors duration-200"}
                                `}
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <span className="text-base">{element.title}</span>
                <motion.div
                  animate={{ rotate: catalogOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoChevronDownOutline className="text-sm" />
                </motion.div>

                {/* Catalog Dropdown */}
                <AnimatePresence>
                  {catalogOpen && (
                    <div className="invisible absolute left-0 top-6 z-50 flex w-75 flex-col rounded-lg backdrop-blur-xl  bg-richblack-800/30 p-5 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {categories.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {categories.map((category) => (
                            <NavLink
                              to={`/catalog/${category.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={category._id}
                              className="w-full font-mono text-lg pl-3 py-1 rounded-md hover:bg-richblack-50 hover:text-richblack-900"
                            >
                              {category.name}
                            </NavLink>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-richblack-300">
                          Loading categories...
                        </div>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={index}
                to={element?.path}
                className={({ isActive }) => `
                                    relative text-base px-1.5 py-1 overflow-hidden
                                    ${isActive ? "text-yellow-50 font-medium" : "text-richblack-25 hover:text-yellow-50 transition-colors duration-200"}
                                `}
              >
                {({ isActive }) => (
                  <>
                    <span>{element.title}</span>
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-yellow-50 to-yellow-100/50 rounded-full"
                        layoutId="navHighlighter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          ))}
        </div>

        {/* Right Section - Login/SignUp/Cart/Profile */}
        <div className="hidden lg:flex items-center gap-4">
          {user && user?.accountType !== "Instructor" && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink to="/dashboard/cart" className="relative p-2">
                <FaCartShopping className="text-2xl text-richblack-25" />
                {totalItems > 0 && (
                  <motion.span
                    className="absolute top-4 -right-5 aspect-square w-5 grid place-content-center bg-yellow-50 text-richblack-900 text-xs font-bold rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </NavLink>
            </motion.div>
          )}

          {token === null && (
            <div className="flex items-center gap-3">
              <NavLink to="/login">
                <motion.button
                  className="px-4 py-2 rounded-lg border border-richblack-700 text-richblack-100 hover:text-yellow-50 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(255, 214, 10, 0.1)",
                    borderColor: "rgba(255, 214, 10, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log In
                </motion.button>
              </NavLink>
              <NavLink to="/signup">
                <motion.button
                  className="px-5 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-medium hover:bg-yellow-100 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 214, 10, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </NavLink>
            </div>
          )}

          {token != null && <ProfileDropDown />}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4 z-50">
          {user && user?.accountType !== "Instructor" && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink to="/dashboard/cart" className="relative p-2">
                <FaCartShopping className="text-xl text-richblack-25" />
                {totalItems > 0 && (
                  <motion.span
                    className="absolute top-4 -right-5 w-5 h-5 flex items-center justify-center bg-yellow-50 text-richblack-900 text-xs font-bold rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </NavLink>
            </motion.div>
          )}

          <motion.button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-richblack-800 hover:bg-richblack-700 text-richblack-100 transition-all duration-200 focus:outline-none border border-richblack-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <RiCloseLine className="h-5 w-5 text-yellow-50" />
            ) : (
              <HiMenu className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-richblack-900/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMobileMenu}
            />

            {/* Slide Menu */}
            <motion.div
              className="fixed top-0 right-0 z-50 w-[80%] sm:w-[60%] md:w-[40%] h-full bg-linear-to-b from-richblack-800 to-richblack-900 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Menu closeMenu={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hidden ProfileDropDown for functionality */}
      <div className="hidden">
        {token != null && <ProfileDropDown />}
      </div>
    </motion.div>
  );
};

export default Navbar;