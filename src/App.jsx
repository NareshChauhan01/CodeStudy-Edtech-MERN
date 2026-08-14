import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
import Navbar from './components/common/Navbar'
import { Error } from './pages/Error'
function App() {

  return (
    <div className='App w-screen min-h-screen bg-richblack-900 flex flex-col font-inter scroll-smooth'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        {/* Error Page -> Invalid Url */}
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
