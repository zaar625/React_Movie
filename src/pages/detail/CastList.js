import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiConfig from "../../api/apiConfig";

const CastList =()=>{
    const { category, id } = useParams();
    const [castList, setcastList] = useState([]);
    
    const getCastList = async()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/${category}/${id}/credits?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko`);

        console.log(data.cast);
        console.log(data.cast.slice(0, 5));
        setcastList(data.cast.slice(0, 5));
    }
    useEffect(()=>{
        getCastList();
         // eslint-disable-next-line
    },[])

    return(
         <div className="casts">
            {
                castList.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList;