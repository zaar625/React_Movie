import axios from "axios";


    const getMovie = async () => {
    const {data} = await axios.get(`
    https://api.themoviedb.org/3/discover/movie?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
    console.log(data);
    

};
export default getMovie;