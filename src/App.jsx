import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from "./pages/Home"
import Navbar from './components/common/Navbar';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ContactUs } from './pages/ContactUs';
import { About } from './pages/About';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyEmail } from './components/core/Auth/VerifyEmail';
import { UpdatePassword } from './pages/UpdatePassword';
import { ResendEmail } from './pages/ResendEmail';
import { MyProfile } from './components/core/dashboard/MyProfile';
import { Dashboard } from "./pages/Dashboard"
import { Settings } from './components/core/dashboard/settings/index';
import { OpenRoute } from './components/core/Auth/OpenRoute';
import { PrivateRoute } from './components/core/Auth/PrivateRoute';
import { Error } from './pages/Error';
import { Catalog } from './pages/Catalog';
import AddCourse from './components/core/dashboard/AddCourse';
import { InstructorCourses } from './components/core/dashboard/instructorCourses';
import EditCourse from './components/core/dashboard/EditCourse';
import { CourseDetails } from './pages/CourseDetails';
import { EnrolledCourse } from './components/core/dashboard/EnrolledCourse/EnrolledCourse';
import { ViewCourse } from './pages/ViewCourse';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import { CourseModule } from './components/core/dashboard/ViewCourse/CourseModule';
import Cart from './pages/Cart';
import { InstructorDashboard } from './components/core/dashboard/instructorDashboard/InstructorDashboard';

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="App w-screen min-h-screen bg-richblack-900 flex flex-col font-inter scroll-smooth">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enquiry" element={<ContactUs />} />
        <Route path="/about" element={<About />} />

        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='/courses/:courseId' element={<CourseDetails />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        {/* Sign up Route */}
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* Update Password Route */}
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        {/* Forgot Password Route */}
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        {/* Verify Email Route */}
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Resend Email Route */}
        <Route
          path="/resend-email"
          element={
            <OpenRoute>
              <ResendEmail />
            </OpenRoute>
          }
        />

        {/* Dashboard Route */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />

          {/* Students */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/cart' element={<Cart />} />
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourse />} />
              </>
            )
          }

          {/* Instructor */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard' element={<InstructorDashboard />} />
                <Route path='/dashboard/add-course' element={<AddCourse />} />
                <Route path='/dashboard/my-courses' element={<InstructorCourses />} />
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
              </>
            )
          }
        </Route>

        {/* Course Module Dashboard -> For Student */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<CourseModule />} />
            )
          }
        </Route>

        {/* Error Page -> Invalid Url */}
        <Route path='*' element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;