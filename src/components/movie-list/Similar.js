
import React, { useEffect, useState } from 'react';


import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import axios from 'axios';
import MovieCard from '../movie-card/MovieCard';

const Similar = ({category,id}) => {
    const [Similar, setSimilar] = useState([]);
    
    const getSimilar = async()=> {
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/${category}/${id}/similar?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&page=1`);
        console.log(data);
        setSimilar(data.results);
    };
    useEffect(()=>{
        getSimilar();
        window.scroll(0,0);
         // eslint-disable-next-line
    },[id]);



    return(
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    Similar.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard category={category} item={item}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Similar;