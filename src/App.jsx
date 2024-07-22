import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import About from './pages/About/About'
import Countries from './pages/Countries/Countries'
import Create from './pages/Create/Create'
import Home from './pages/Home/Home'

import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Countries' element={<Countries />} />
        <Route path='/About' element={<About />} />
        <Route path={'*'} element={<NotFound />}/>
      </Routes>
      
      <Footer />
    </>
  )
}

export default App