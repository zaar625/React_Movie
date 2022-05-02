import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/button";
import Modal, { ModalContent } from "../modal/Modal";

import "./hero-slide.scss";
import "swiper/swiper.scss";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko&sort_by=popularity.desc&include_adult=false&page=1`);
      console.log(data);
      setMovieItems(data.results.slice(1, 4));
    };
    getMovie();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        // modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();
  const item = props.item;
  console.log(item);

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=af43ac72d70dd07b3747f0dc7b4a2680&language=ko`
    );
    console.log(data);
    if (data.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + data.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push("/movie/" + item.id)}>
              Watch Info
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Preview
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};
export default HeroSlide;
