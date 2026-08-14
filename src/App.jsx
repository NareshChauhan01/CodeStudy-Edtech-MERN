import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
import Navbar from './components/common/Navbar'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { OpenRoute } from './components/core/Auth/OpenRoute'
import { Error } from './pages/Error'
Signup
function App() {

  return (
    <div className='App w-screen min-h-screen bg-richblack-900 flex flex-col font-inter scroll-smooth'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

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

        {/* Error Page -> Invalid Url */}
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
