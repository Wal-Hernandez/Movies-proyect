import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
export function MovieCard({ pelis }) {
  const imageUrl = "https://image.tmdb.org/t/p/w300" + pelis.poster_path;
  return (
    <li className={styles.movieCard}>
      <Link to={"/movie/" + pelis.id}>
        <img
          width={230}
          height={345}
          src={pelis.poster_path ? imageUrl : "default.jpg"}
          alt={pelis.title}
          className={styles.movieImage}
        />
        <h3 className={styles.title}>{pelis.title}</h3>
      </Link>
    </li>
  );
}
