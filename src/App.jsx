import React from 'react'
import "./App.css"

// Redux 
import { useSelector } from 'react-redux'

// React Router
import { Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Common/Navbar'
// Pages
import Home from './pages/Home'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import Error from './pages/Error'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import { ACCOUNT_TYPE } from './utils/constants'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Settings from './components/core/Dashboard/Settings'
import Cart from './components/core/Dashboard/Cart'

function App() {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route
          path='signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path='Login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path='verify-email'
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path='forgot-password'
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>}
        />


        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Settings />} />

          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/cart" element={<Cart />} />

            </>
          )}

        </Route>

        {/* Error Page */}
        <Route path='*' element={<Error />} />

      </Routes>
    </div>
  )
}

export default App