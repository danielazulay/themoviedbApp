import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  loadMovies,
  setCategory,
  setPage,
} from "../store/actions/movie.actions";
import { MovieList } from "../cmps/MovieList";
import { useParams } from "react-router-dom";

export function MovieIndex() {

  const { url } = useParams();

  const [totalPages, setTotalPages] = useState(0);

  const { category, page, movies } = useSelector(
    (storeState) => storeState.movieModule
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        let response;

        if (url !== category) {
          setCategory(url);
          handleSetPage();
           response = await loadMovies(1, url);
   
        } else {
           response = await loadMovies(page, url);

        }

        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };
    loadData();
  }, [page, url]);



  function handleSetPage() {
    setPage(1);
  }

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 0) setPage(page - 1);
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

      {page < totalPages && (
        <button className="button-next" onClick={handleNextPage}>
          next
        </button>
      )}
    </section>
  );
}
