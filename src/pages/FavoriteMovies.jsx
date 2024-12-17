import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadMyFavorite, nextPage } from "../store/actions/movie.actions";
import { MovieList } from "../cmps/MovieList";

export function FavoriteMovies() {
  const [favoritePages, setFavoritePages] = useState();
  const { page, movies } = useSelector((storeState) => storeState.movieModule);

  useEffect(() => {
    const loadFavoriteData = async () => {
      try {
        const response = await loadMyFavorite(page);
        setFavoritePages(response.total_pages);
        console.log(response.total_pages);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };

    loadFavoriteData(); 
  }, [page]);

  function handleNextPage() {
    nextPage(page + 1);
  }

  function handlePrevPage() {
    nextPage(page - 1);
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
        <button className="button-next" onClick={handleNextPage}>
          next
        </button>
      )}
    </section>
  );
}
