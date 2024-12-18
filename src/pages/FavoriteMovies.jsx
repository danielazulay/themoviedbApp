import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadMovies, setPage } from "../store/actions/movie.actions";
import { MovieList } from "../cmps/MovieList";

export function FavoriteMovies() {
  const [favoritePages, setFavoritePages] = useState();
  const { page, movies } = useSelector((storeState) => storeState.movieModule);

  useEffect(() => {
    const loadFavoriteData = async () => {
      try {
        const response = await loadMovies(page, "favorite");
        setFavoritePages(response.total_pages);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };

    loadFavoriteData();
  }, [page]);

  function handlesetPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  if (!movies || movies.length === 0) return <div>Loading...</div>;

  return (
    <section className="movie-index">
      <button
        className={`button-next ${1 === page ? "hidden" : ""}`}
        onClick={handlePrevPage}
      >
        prev
      </button>

      {<MovieList movies={movies} />}

      {favoritePages > 1 && page < favoritePages && (
        <button className="button-next" onClick={handlesetPage}>
          next
        </button>
      )}
    </section>
  );
}
