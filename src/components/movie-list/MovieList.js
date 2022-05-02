import React, { useEffect, useState } from 'react';


import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import axios from 'axios';
import MovieCard from '../movie-card/MovieCard';

const MovieList = () => {
    const [trendingMovie, setTrendingMovie] = useState([]);
    const category = 'movie'
    
    const getTrendingMovie = async()=> {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko`);
        console.log(data);
        setTrendingMovie(data.results);
    };
    useEffect(()=>{
        getTrendingMovie();
    },[]);



    return(
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    trendingMovie.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default MovieList;