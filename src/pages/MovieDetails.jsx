import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { get } from ".././utils/httpClient";
import { Spinner } from ".././components/Spinner.jsx";
import { Search } from "../components/Search";
import { Link } from "react-router-dom";

export function MovieDetails() {
  const { movieId } = useParams();
  const [spinner, setSpinner] = useState(true);
  const [movies, setMovie] = useState(null);

  useEffect(() => {
    get("/movie/" + movieId).then((data) => {
  
      setMovie(data);
      setSpinner(false);
    });
  }, [movieId]);

  if (spinner) {
    return <Spinner />;
  }
  if (!movies) {
    return null;
  }
  function imageUrl(img) {
    return "https://image.tmdb.org/t/p/w200" + img;
  }
  function imageUrlBack(img) {
    return "https://image.tmdb.org/t/p/w1280" + img;
  }
  return (<>
  <div className={styles.body}>
  <header >
          <Link to={"/"} className={styles.logo}>
     
         <img
           src="/movie-solid-24.png"
           alt="movieIcon"
           className={`${styles.bx} ${styles.bxs}`}
         />
         Movie
      
       </Link>
      
       <div className={styles.search}>
        <Search />
       </div>
     </header> 
     
     <div className={styles.movieCard}>
       <div className={styles.container1}>
         <a href="#"> <img src={movies.backdrop_path ? imageUrl(movies.poster_path) : "/defaultBack.jpg"} alt="background" className={styles.cover}/></a> 
         <div className={styles.hero} style={{background: `url(${imageUrlBack(movies.backdrop_path)})`}}>
           <div className={styles.details}>
             <div className={styles.title1}>{movies.title}</div>
             <div className={styles.title2}>{movies.tagline}</div>
             <fieldset className={styles.rating}>
               <input type="radio" id="star5" name="rating" value="5" />
               <label className={styles.full} htmlFor="star5" title="Awesone - 5 stars"></label>

               <input type="radio" id="star4half" name="rating" value="4 and a half" />
               <label htmlFor="star4half" className={styles.half} title="Pretty good - 4.5 stars"></label>

               <input type="radio" id="star4" name="rating" value="4" />
               <label htmlFor="star4" className={styles.full} title="Pretty good - 4 stars"></label>

               <input type="radio" id="star3half" name="rating" value="3 and a half" />
               <label htmlFor="star3half" className={styles.half} title="Regular- 3.5 stars"></label>

               <input type="radio" id="star3" name="rating" value="3" />
               <label htmlFor="star3" className={styles.full} title="Meh  - 3 stars"></label>

               <input type="radio" id="star2half" name="rating" value="2 and a half" />
               <label htmlFor="star2half" className={styles.half} title=" Meh - 2.5 stars"></label>

               <input type="radio" id="star2" name="rating" value="2" />
               <label htmlFor="star2" className={styles.full} title="Kinda bad - 2 stars"></label>

               <input type="radio" id="star1half" name="rating" value="1 and a half" />
               <label htmlFor="star1half" className={styles.half} title="Kinda bad - 1.5 stars"></label>

               
               <input type="radio" id="star1" name="rating" value="1" />
               <label htmlFor="star1" className={styles.full} title="Sucks big time - 1 star"></label>

               <input type="radio" id="starhalf" name="rating" value="half" />
               <label htmlFor="starhalf" className={styles.half} title="Sucks big time - 0.5 stars"></label>  
             </fieldset>
             <span className={styles.likes}> {Math.round(movies.popularity)}</span>
           </div>
         </div>
         <div className={styles.description}>
           <div className={styles.column1}>
              {
                movies.genres && movies.genres.slice(0, 5).map((genre) => (
                  <span key={genre.id} className={styles.tag}>{genre.name}</span>
                  ))
              }
              </div>
              <div className={styles.column2}>
                <p>{movies.overview} <a href="#">read more</a>
                </p>
              </div>
          </div>
       </div>
      </div>
      </div>
    </>
  );
}
