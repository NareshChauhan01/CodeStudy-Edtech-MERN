export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/profile",
    icon: "HiMiniUser",
  },

  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard",
    type: "Instructor",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "HiMiniSquares2X2",
  },

  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: "Instructor",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "HiMiniBookOpen",
  },

  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: "Instructor",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "HiMiniPlusCircle",
  },

  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: "Student",
    // type: ACCOUNT_TYPE.STUDENT,
    icon: "HiMiniAcademicCap",
  },

  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: "Student",
    // type: ACCOUNT_TYPE.STUDENT,
    icon: "HiMiniShoppingCart",
  },
];