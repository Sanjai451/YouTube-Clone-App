import React, { useEffect, useState } from 'react'
import './Feed.css'
import tn1 from '../../assets/thumbnail1.png'
import tn2 from '../../assets/thumbnail2.png'
import tn3 from '../../assets/thumbnail3.png'
import tn4 from '../../assets/thumbnail4.png'
import tn5 from '../../assets/thumbnail5.png'
import tn6 from '../../assets/thumbnail6.png'
import tn7 from '../../assets/thumbnail7.png'
import tn8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import 'moment'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
const Feed = ({category}) => {
  
    const [data,setData]=useState([])

    const fetchData = async ()=>{
        const videoListUrl= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${[API_KEY]}`
        await fetch(videoListUrl)
        .then(res=>res.json())
        .then(data=>setData(data.items))
        
    }

    useEffect(()=>{
        fetchData();
       
    },[category])


  return (
    <div className="feed">
        {
            data.map((item,index)=>{
                return(
                    <Link id={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" /> 
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })
        }

    </div>
   
  )
}

export default Feed
