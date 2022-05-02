import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const VideoList=()=>{

    const [videoList, setVidieoList] = useState([]);
    const {category, id} = useParams();

    const getVideos = async()=>{
        const{data} = await axios.get(`
        https://api.themoviedb.org/3/${category}/${id}/videos?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko`);
        console.log(data)
        console.log(data.results.slice(0,3));
        setVidieoList(data.results.slice(0,3));
    }
    useEffect(()=>{
        getVideos();
         // eslint-disable-next-line
    },[category, id]);


    return(
        <>
            {
                videoList.map((item, i) => (
                    <Video key={i} item={item}/>
                ))
            }
        </>
    )
}

const Video = props => {

    const item = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        // const height2 =iframeRef.current.offsetWidth //445
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
        // console.log(height2);
        console.log(height)
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default VideoList;