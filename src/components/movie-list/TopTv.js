import React, { useEffect, useState } from 'react';


import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import axios from 'axios';
import MovieCard from '../movie-card/MovieCard';

const TopTvList = () => {
    const [topratedTv, settopratedTv] = useState([]);
    const category = 'tv'
    
    const gettopratedTv = async()=> {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${category}/top_rated?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&page=1`);
        console.log(data);
        settopratedTv(data.results);
    };

    useEffect(()=>{
        gettopratedTv();
    },[]);

    return(
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    topratedTv.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard category={category} item={item}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default TopTvList;