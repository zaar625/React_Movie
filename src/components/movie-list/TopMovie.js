import React, { useEffect, useState } from 'react';


import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import axios from 'axios';
import MovieCard from '../movie-card/MovieCard';

const TopMovieList = () => {
    const [topratedMovie, settopratedMovie] = useState([]);
    const category = 'movie'
    
    const gettopratedMovie = async()=> {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${category}/top_rated?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&page=1`);
        console.log(data);
        settopratedMovie(data.results);
    };

    useEffect(()=>{
        gettopratedMovie();
    },[]);

    return(
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    topratedMovie.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard category={category} item={item}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default TopMovieList;