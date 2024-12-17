import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../services/movie.service";
import { Link } from "react-router-dom";
import { addFavorite } from "../store/actions/movie.actions";

export function MovieDetails() {
  const { movieId } = useParams();


  const [movie, setmovie] = useState(null);

  useEffect(() => {
   loadMovie()
  }, [movieId]);

  function handelSave() {

    addFavorite(movieId);
  }

  async function loadMovie() {
    try {

      const res = await movieService.getById(movieId);
      setmovie(res);
    } catch (err) {
      console.log("Had issues loading this movie", err);
    }
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <section className="movie-details">
      <div className="movie-poster">
        <img
          className="img-cover"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-description">
        <h2>{movie.title}</h2>
        <strong>Genres:</strong>{" "}
        {movie.genres?.map((genre) => genre?.name).join(", ")}
        <p>
          <strong>Release Date:</strong> {movie?.release_date}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>Language:</strong> {movie.spoken_languages[0]?.name}
        </p>
        <p>
          <strong>Country:</strong> {movie.production_countries[0]?.name}
        </p>
        <h3>Overview</h3>
        <p>{movie?.overview}</p>
        <h3>Additional Info</h3>
        <ul>
          <li>
            <strong>IMDb:</strong>{" "}
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {movie?.imdb_id}
            </a>
          </li>
          <li>
            <strong>Production Companies:</strong>{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </li>
          <li>
            <strong>Status:</strong> {movie?.status}
          </li>
          <li>
            <strong>Average Vote:</strong> {movie.vote_average} (from{" "}
            {movie?.vote_count} votes)
          </li>
          <li>
            <strong>Popularity:</strong> {movie.popularity}
          </li>
        </ul>
        <p onClick={handelSave}>
          Add To Favorite
        </p>
        <Link to="/">Go back</Link>
      </div>
    </section>
  );
}



// export function MovieDetails() {
//   const params = useParams();
//   console.log("useParams asas:", params);

//   return <div>Check console for params</div>;
// }