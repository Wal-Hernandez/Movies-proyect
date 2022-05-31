import React,{ useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { get } from ".././utils/httpClient.js";
import { Spinner } from "./Spinner.jsx";
import styles from "./Coming.module.css";
import { Link } from "react-router-dom";

function Coming() {
    const [coming, setComing] = useState([]);
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {
    
        get("/movie/upcoming").then((data) => {
          
            setComing(data.results);
            setSpinner(false);
          });
    
      }, []);

      
      function imageUrlComing(n){
        return coming[n].poster_path ? "https://image.tmdb.org/t/p/w300" + coming[n].poster_path : "/default.jpg";
      } 


      if (spinner) {
        return <Spinner />;
      }
      
  return (
    <>
        <section className="coming" id="coming">
          <h2 className={styles.heading}>Coming Soon</h2>
        {/**coming container */}
        <Swiper className={styles.container}
       slidesPerView={3}
       spaceBetween={4}
       slidesPerGroup={3}
       loop={true}
       loopFillGroupWithBlank={true}
       pagination={{
         clickable: true,
       }}
       navigation={true}
       modules={[Pagination, Navigation]} 
       >
          {coming.map((movie,i) => {
        while(i < 9){
          return (
            <SwiperSlide  className={styles.boxContainer} key={movie.id}>
            <Link to={"/movie/" + movie.id}><div className={` ${styles.box}`} >
              <img src={imageUrlComing(i)}className={styles.boxImage } alt="movie"/>
              </div>
              </Link>
           <h3 className={styles.title}>{movie.title  }</h3>
            </SwiperSlide>
          )
        }})}
          </Swiper>
           <div className="swiper-pagination swiper-pagination-bullet"></div>

        </section>
    </>
  )
}

export default Coming