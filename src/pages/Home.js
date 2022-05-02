import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/button";
import HeroSlide from "../components/HeroSlide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import TopMovieList from "../components/movie-list/TopMovie";
import TopTvList from "../components/movie-list/TopTv";
import TrendingTv from "../components/movie-list/TvList";

const Home =() => {
    return (
        <>
            <HeroSlide/>
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TopMovieList/>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TrendingTv/>
                </div>

                  <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TopTvList/>
                </div>
            </div>
        </>
    )
}

export default Home;