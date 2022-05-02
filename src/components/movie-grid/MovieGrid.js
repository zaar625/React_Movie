import axios from "axios";
import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import Button, { OutlineButton } from "../button/button";
import Input from "../input/Input";
import MovieCard from "../movie-card/MovieCard";
import './movie-grid.scss';

const MovieGrid =(props) =>{

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const {keyword, category } = useParams();
    console.log(keyword);

    const getList = async () => {
            if (keyword === undefined) {
                const {data} = await axios.get(`https://api.themoviedb.org/3/discover/${category}?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&${page}=1&with_watch_monetization_types=flatrate`)
                console.log(data)
                setItems(data.results);
                setTotalPage(data.total_pages);
            } 
            else{
                const {data} = await axios.get(`https://api.themoviedb.org/3/search/${category}?api_key=af43ac72d70dd07b3747f0dc7b4a2680&query=${keyword}`)
                setItems(data.results);
                setTotalPage(data.total_pages);
            }
        }
    useEffect(()=>{
        getList();
    // eslint-disable-next-line
    },[keyword,category])
    
    
     const loadMore = async () => {
         if (keyword === undefined) {
                const {data} = await axios.get(`https://api.themoviedb.org/3/discover/${category}?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page+1}&with_watch_monetization_types=flatrate`)
                console.log(data)
                setItems([...items, ...data.results]);
                setPage(page+1);
            } 
            else{
                const {data} = await axios.get(`https://api.themoviedb.org/3/search/${category}?api_key=af43ac72d70dd07b3747f0dc7b4a2680&query=${keyword}`)
                setItems(data.results);
                setTotalPage([...items, ...data.results]);
            }
     }



    return(
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${props.category}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}


export default MovieGrid;