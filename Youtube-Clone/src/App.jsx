import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar/Navbar'
import Home from './Pages/homepage/Home'
import Video from './Pages/videopage/Video'
import {Routes, Route } from 'react-router-dom'
function App() {
 

  const [sideBar,setSideBar]=useState(true)
  return (
   <div>
     <Navbar setSideBar={setSideBar}/>
     <Routes>
          <Route path='/' element ={<Home sideBar={sideBar} />} />
          <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
     </Routes>
   </div>
  )
}

export default App
