import { Link } from "react-router-dom";

export function MoviePreview({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;

  return (
    <article className="movie-preview">
      <Link to={`/details/${movie.id}`}>
        <img
          className="movie-poster"
          src={imageUrl}
          alt={movie.original_title}
        />
      </Link>
      <h2>{movie.title}</h2>
    </article>
  );
}
