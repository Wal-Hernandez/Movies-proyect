import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import styles from "./Moviesgrid.module.css";
import { get } from ".././utils/httpClient.js";
import { Spinner } from "./Spinner.jsx";
import { useQuery } from "../hooks/useQuery";
import {Search} from "./Search";
import Coming from "./Coming";
import SwiperMovie from "./SwiperMovie";
import { Link } from "react-router-dom";
export function MoviesGrid() {
  const [spinner, setSpinner] = useState(true);
  const [movies, setMovies] = useState([]);

  const [classes, setClasses] = useState(false);
  const query = useQuery();
  const search = query.get("search");



  useEffect(() => {
   
    const searchUrl = search
      ? "/search/movie?query=" + search
      : "/discover/movie";

    get(searchUrl).then((data) => {
      setMovies(data.results);
      setSpinner(false);
      
    });
  
  }, [search,classes]);

  
  if (spinner) {
    return <Spinner />;
  }
  
 
  
  function handleNav(e){
    if(classes){
      const targetId = e.target.id ;
      const getClasses = document.querySelectorAll("#root > main > header > ul > li > a");
      getClasses.forEach(getClass => {
        getClass.classList = "";
        if(getClass.id === targetId){
          getClass.classList.add("Moviesgrid_homeActive__Aj1Ss")
        }
      })
      return(getClasses);
    }
  }
 
  (function headerShadow(){
    let header = document.querySelector('header');
    let navbar = document.querySelector("#navbar");
    let menu = document.querySelector("#menu-icon");

    window.addEventListener('scroll', () => {
      if(menu){
        menu.src="menu-regular-24.png";
      }
      
      if(navbar){
        navbar.classList.remove(styles.active)
      }
    
      if(header){
        header.classList.toggle(styles.shadow, window.scrollY > 0);
      }

    })
  })()
  
  function changeMenu(){
    let menu = document.querySelector("#menu-icon")
    let navbar = document.querySelector("#navbar");

    menu.src.includes("menu") 
    ? document.querySelector("#menu-icon").src="x-regular-24.png" 
    : document.querySelector("#menu-icon").src="menu-regular-24.png";
    
    navbar.classList.toggle(styles.active)
    
  
    
 
  }; 
  

  return (
    <>
     <header >
    
     <img
            src="menu-regular-24.png"
            alt="movieIcon"
            id="menu-icon"
            className={`${styles.bx} ${styles.bxMenu}`}
            onClick={changeMenu}
          />
           <Link to={"/"}  className={styles.logo}>
          <img
            src="movie-solid-24.png"
            alt="movieIcon"
            className={`${styles.bx} ${styles.bxs}`}
          />
          Movie
        </Link>
       
        {/* MENU */}
        <ul className={styles.navbar} id="navbar">
          <li>
            <a href="#home" id="home1" className={`${styles.homeOff} ${styles.homeActive}`} onClick={handleNav}>Home</a>
          </li>
          <li>
            <a href="#movies" id="movies1" className={`${styles.homeOff}`} onClick={handleNav}>Movies</a>
          </li>
          <li>
            <a href="#coming" id="coming1" className={`${styles.homeOff}`} onClick={handleNav}>Coming</a>
          </li>
        
        </ul>
        <div className={styles.search}>
         <Search />
        </div>
        {classes === false ? setClasses(true) : false}
        { /*   */ }
      </header>
      {/*Swiper */}
      <SwiperMovie movies={movies}/>
        <section className={styles.movies} id="movies">
          <h2 className={styles.heading}>Opening This Week</h2>
    <ul className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} pelis={movie} />
      ))}
    </ul>
      </section>
      <Coming/>
      {/* Footer */}
      <section className={styles.footer}>
      <a href="#" className={styles.logo}>
          <img
            src="movie-solid-24.png"
            alt="movieIcon"
            className={`${styles.bx} ${styles.movie}`}
          />Movies
        </a>
        <div className={styles.social}>
        <a href="https://github.com/Wal-Hernandez" className={styles.logo}>
          <img
            src="github-logo-24.png"
            alt="movieIcon"
            className={`${styles.bx} `}
          />
        </a>
        <a href="https://www.linkedin.com/in/walter-hernandez-0b7419224 " className={styles.logo}>
          <img
            src="linkedin-logo-24.png"
            alt="movieIcon"
            className={`${styles.bx}`}
          />
        </a>
        </div>
      </section>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>&#169; Wal Hernandez All Right Reserved.</p>

      </div>
    </>
  );
}
