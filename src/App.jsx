import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { About } from './pages/About'
function App() {

  return (
    <div className='App w-screen min-h-screen bg-richblack-900 flex flex-col font-inter scroll-smooth'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
