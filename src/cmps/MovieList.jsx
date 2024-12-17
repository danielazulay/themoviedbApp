import { MoviePreview } from "./MoviePreview";

export function MovieList({ movies }) {

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviePreview movie={movie} />
        </li>
      ))}
    </ul>
  );
}
