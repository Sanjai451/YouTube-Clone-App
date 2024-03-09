import React, { useState } from 'react'
import './Home.css'
import SideBar from '../../Components/sidebar/SideBar'
import Feed from '../../Components/feed/Feed'
const Home = ({sideBar}) => {

  const [category,setCategory] = useState(0)


  return (
    <>
        <SideBar sideBar={sideBar} category={category} setCategory={setCategory}/>
        <div className={`container ${sideBar?"":"large-container"}`}>
              <Feed category={category}/>
        </div>
    </>
  )
}

export default Home
