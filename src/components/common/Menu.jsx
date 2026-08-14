import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import * as Icons from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdKeyboardArrowDown, MdDashboardCustomize } from "react-icons/md";

import { ACCOUNT_TYPE } from "../../utils/constants";
import { logout } from "../../services/operations/authAPI";
// import logo from "../../assests/logos/Logo-Full-Light.png";
import { fetchCourseCategories } from "../../services/operations/courseAPI";
import { menu, studentMenu, instructorMenu } from "../../data/menuSectionData";

export function Menu({ closeMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // State management
  const [dashboardExpanded, setDashboardExpanded] = useState(true);
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [menuMounted, setMenuMounted] = useState(false);

  // Fetch categories and set animation state
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const result = await fetchCourseCategories();
        setCategories(result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
    setMenuMounted(true);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout(dispatch, navigate)
    if (closeMenu) closeMenu();
  };

  // Helper function to render icons
  const renderIcon = (iconName) => {
    const Icon = Icons[iconName];
    return <Icon className="text-lg" />;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    }
  };

  return (
    <div className="h-full z-50 flex flex-col bg-richblack-900 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-richblack-700">
        <NavLink to="/" onClick={closeMenu}>
          {/* <motion.img
            src={logo}
            alt="StudyNotion"
            className="w-32.5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          /> */}
          <motion.p
            className="w-32.5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            CodeStudy
          </motion.p>
        </NavLink>
        <motion.button
          onClick={closeMenu}
          className="p-2 rounded-full hover:bg-richblack-700 text-richblack-300 hover:text-yellow-50 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoClose className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Menu Content */}
      <motion.div
        className="flex-1 overflow-y-auto custom-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate={menuMounted ? "visible" : "hidden"}
      >
        <div className="p-5 flex flex-col gap-5">
          {/* User Profile Section (if logged in) */}
          {user && (
            <motion.div
              className="bg-richblack-800 border border-richblack-700 rounded-xl overflow-hidden shadow-md"
              variants={itemVariants}
            >
              {/* User Profile Header */}
              <div className="p-4 border-b border-richblack-700 bg-linear-to-r from-richblack-700 to-richblack-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-richblack-700 flex items-center justify-center">
                    {user.image ? (
                      <img
                        loading="lazy"
                        src={user.image}
                        alt={user.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-yellow-50 text-lg font-semibold">
                        {user?.firstName?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-richblack-5 font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Toggle Section */}
              <div className="p-1">
                <button
                  className="flex items-center justify-between w-full px-3 py-2.5 text-yellow-50 hover:bg-richblack-700/40 rounded-lg"
                  onClick={() => setDashboardExpanded(!dashboardExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <MdDashboardCustomize className="text-lg" />
                    <span className="font-medium">Dashboard</span>
                  </div>

                  <motion.div
                    animate={{ rotate: dashboardExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdKeyboardArrowDown className="text-lg" />
                  </motion.div>
                </button>

                {/* Dashboard Links */}
                <AnimatePresence>
                  {dashboardExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1 pb-2 px-2">
                        <div className="ml-2 flex flex-col gap-1">
                          {/* Dashboard Items */}
                          {user.accountType === ACCOUNT_TYPE.STUDENT
                            ? studentMenu.map((item, index) => (
                              <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => `
                                                                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                                                    ${isActive
                                    ? "bg-yellow-800/20 text-yellow-50 font-medium"
                                    : "text-richblack-50 hover:bg-richblack-700/30 hover:text-yellow-50"}
                                                                    transition-all duration-200
                                                                `}
                                onClick={closeMenu}
                              >
                                <span className="text-base">
                                  {renderIcon(item.icon)}
                                </span>

                                <span>{item.title}</span>

                                {item.title === "Cart" && totalItems > 0 && (
                                  <span className="ml-auto bg-yellow-50 text-richblack-900 text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems}
                                  </span>
                                )}
                              </NavLink>
                            ))
                            : instructorMenu.map((item, index) => (
                              <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => `
                                                                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                                                    ${isActive
                                    ? "bg-yellow-800/20 text-yellow-50 font-medium"
                                    : "text-richblack-50 hover:bg-richblack-700/30 hover:text-yellow-50"}
                                                                    transition-all duration-200
                                                                `}
                                onClick={closeMenu}
                              >
                                <span className="text-base">
                                  {renderIcon(item.icon)}
                                </span>
                                <span>{item.title}</span>
                              </NavLink>
                            ))
                          }

                          {/* Logout Button (inside dashboard) */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-pink-200 hover:bg-pink-900/20 hover:text-pink-100 transition-all duration-200"
                          >
                            <HiOutlineLogout className="text-base" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Login/Signup section if not logged in */}
          {!user && (
            <motion.div
              className="bg-richblack-800 border border-richblack-700 rounded-xl p-4 shadow-md"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-yellow-50 font-medium">Join StudyNotion</h3>
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/login"
                    className="w-full"
                    onClick={closeMenu}
                  >
                    <motion.button
                      className="w-full py-2.5 px-4 rounded-md border border-richblack-700 text-richblack-50 transition-all duration-200"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(71, 85, 105, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log In
                    </motion.button>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="w-full"
                    onClick={closeMenu}
                  >
                    <motion.button
                      className="w-full py-2.5 px-4 rounded-md bg-yellow-50 text-richblack-900 font-medium transition-all duration-200"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(255, 214, 10, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Menu Links */}
          <motion.div variants={itemVariants} className="bg-richblack-800 border border-richblack-700 rounded-xl overflow-hidden shadow-md">
            <div className="p-1">
              {menu.map((item, index) => (
                item.title === "Catalog" ? (
                  <div key={index} className="mb-1">
                    {/* Catalog Toggle Button */}
                    <button
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg ${location.pathname.includes('/catalog')
                        ? "bg-yellow-800/20 text-yellow-50 font-medium"
                        : "text-richblack-50 hover:bg-richblack-700/40 hover:text-yellow-50"
                        }`}
                      onClick={() => setCatalogExpanded(!catalogExpanded)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">
                          {renderIcon(item.icon)}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: catalogExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MdKeyboardArrowDown className="text-lg" />
                      </motion.div>
                    </button>

                    {/* Catalog Expanded Categories */}
                    <AnimatePresence>
                      {catalogExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-1 pb-2 px-2">
                            <div className="ml-2 bg-richblack-900/30 rounded-lg p-2 max-h-50 overflow-y-auto custom-scrollbar">
                              {loadingCategories ? (
                                <div className="flex items-center justify-center py-3">
                                  <div className="w-5 h-5 border-2 border-yellow-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  <span className="text-richblack-300 text-sm">Loading categories...</span>
                                </div>
                              ) : categories.length > 0 ? (
                                <div className="flex flex-col gap-1">
                                  {categories.map((category) => (
                                    <NavLink
                                      key={category._id}
                                      to={`/catalog/${category.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className={({ isActive }) => `
                                                                                flex items-center px-3 py-2 rounded-lg text-sm
                                                                                ${isActive
                                          ? "bg-yellow-800/20 text-yellow-50 font-medium"
                                          : "text-richblack-50 hover:bg-richblack-700/30 hover:text-yellow-50"}
                                                                                transition-all duration-200
                                                                            `}
                                      onClick={closeMenu}
                                    >
                                      <FaChevronRight className="text-xs mr-2 text-yellow-50" />
                                      <span>{category.name}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-3 text-richblack-300 text-sm">
                                  No categories found
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `
                                            flex items-center gap-3 px-3 py-2.5 m-1 rounded-lg 
                                            ${isActive
                        ? "bg-yellow-800/20 text-yellow-50 font-medium"
                        : "text-richblack-50 hover:bg-richblack-700/40 hover:text-yellow-50"}
                                            transition-all duration-200
                                        `}
                    onClick={closeMenu}
                  >
                    <span className="text-base">
                      {renderIcon(item.icon)}
                    </span>
                    <span>{item.title}</span>
                  </NavLink>
                )
              ))}
            </div>
          </motion.div>

          {/* Footer Copyright */}
          <motion.div
            className="text-center text-xs text-richblack-400 mt-auto pt-4"
            variants={itemVariants}
          >
            <p>© 2025 StudyNotion</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}