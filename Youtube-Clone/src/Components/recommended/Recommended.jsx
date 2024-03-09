import React, { useEffect, useState } from 'react'
import './Recommended.css'
import tn1 from '../../assets/thumbnail1.png'
import tn2 from '../../assets/thumbnail2.png'
import tn3 from '../../assets/thumbnail3.png'
import tn4 from '../../assets/thumbnail4.png'
import tn5 from '../../assets/thumbnail5.png'
import tn6 from '../../assets/thumbnail6.png'
import tn7 from '../../assets/thumbnail7.png'
import tn8 from '../../assets/thumbnail8.png'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'
const Recommended = ({categoryId}) => {

    const [apiData,setApiData]=useState([])

    const fetchData = async ()=>{

        const relatedvideoUrl=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedvideoUrl)
        .then(res=>res.json())
        .then(data=>setApiData(data.items))
    }

useEffect(()=>{
    fetchData()
},[])

  return (
   <div className="recommended">

    {
        apiData.map((item,index)=>{
            return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className='vid-info'>
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} views</p>
                    </div>
                </Link>
            )
        })
    }
        <div className="side-video-list">
            <img src={tn1} alt="" />
            <div className='vid-info'>
                <h4>Best youtbe channel</h4>
                <p>Sanjai Kumar</p>
                <p>200 views</p>
            </div>
        </div>
       
   </div>
  )
}

export default Recommended
