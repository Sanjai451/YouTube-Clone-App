import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} = useParams()

    const [apiData,setAPIData] = useState(null)

    const [channelData,setChannelData]=useState(null)

    const [comments,setComments] = useState([])

    const fetchChannelData = async()=>{
        //Fetching channeldata
        const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelDataUrl)
        .then(res=>res.json())
        .then(data=>setChannelData(data.items[0]))
         //Fetching comments from video id
         const urlForComments=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=25&videoId=${videoId}&key=${API_KEY}`;
         await fetch(urlForComments)
         .then(res=>res.json())
         .then(data=>setComments(data.items))
    }


    const fetchVideoData = async() =>{
        //fetching data of videos  
        const videoDetailUrlFromID=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`      
        await fetch(videoDetailUrlFromID)
        .then(res=>res.json())
        .then(data=>setAPIData(data.items[0]))
    }

    // const fetchComments =async()=>{
    //     //Fetching comments from video id
    //     const urlForComments=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    //     await fetch(urlForComments)
    //     .then(res=>res.json())
    //     .then(data=>setComments(data.items))

    // }

    useEffect(()=>{
        fetchVideoData()
       
    },[videoId])
    useEffect(()=>{
        fetchChannelData()
    },[apiData])
  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay ></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Tilte Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"no views"} views &bull; </p>
            <div>
                <span><img src={like}alt="" />{apiData?apiData.statistics.likeCount:""}</span>
                <span><img src={dislike}alt="" />100</span>
                <span><img src={share}alt="" />Share</span>
                <span><img src={save}alt="" />Save</span>
            </div>
            </div>
            <hr />
            <div className="publisher">
                
                <div>
                {/* src={channelData?channelData.snippet.thumbnails.default.url:""} */}
                    <img src={channelData?channelData.snippet.thumbnails.default.url:user_profile}   alt="" />
                    <p>{apiData?apiData.snippet.channelTitle:"Channel"} </p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="video-description">
               <p>{apiData?apiData.snippet.description.slice(0,250):"Description"}</p>
                <hr />
                <h4>{apiData?apiData.statistics.commentCount:"100"} Comments</h4>


                {
                    comments.map((item,index)=>{
                        return(
                            <div id={index} className="comments">
                                <div className='user-profile'>
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                </div>
                                <div>
                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />
                                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                        <img src={dislike} alt="" />
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
           
      
    </div>
  )
}

export default PlayVideo
