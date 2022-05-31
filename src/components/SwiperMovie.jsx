import React,{useState,useEffect} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from "./SwiperMovie.module.css"
import { Spinner } from "./Spinner.jsx";
import { Link } from "react-router-dom";
function SwiperMovie({movies}) {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
   
    if(movies){
      setSpinner(false)
    }
  
  }, [movies]);


    function imageUrl(n){
        return movies[n].backdrop_path ? "https://image.tmdb.org/t/p/original" + movies[n].backdrop_path : "/defaultBack.jpg";
      } 
    if(spinner){
      return <Spinner />;
    }
  return (<>
    <section className="home swiper" id="home">
    <Swiper className="swiper-wrapper"
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
   >
      
      {movies.map((movie,i) => {
        while(i < 6){
          return (
            <SwiperSlide className={`swiper-slide ${styles.container}`} key={movie.id} >
            <img src={imageUrl(i)} alt="movie"/>
            <div className={styles.homeText}>
                        <h1>{movie.title}</h1>
              <Link to={"/movie/" + movie.id} className={styles.btn}>Watch Now</Link>
              <Link to={"/movie/" + movie.id} className={styles.play}><img src="/play.svg"  className={`${styles.bxPlay} ${styles.bx}`} alt="play" /></Link>
            </div>
          </SwiperSlide>
          )
        }
        
      })}
      </Swiper>
       <div className="swiper-pagination swiper-pagination-bullet"></div>
    </section>
    </> 
  )
}

export default SwiperMovie